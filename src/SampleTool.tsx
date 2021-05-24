import { declareModule, makeIconModuleOnModule, Registration, Separator, ToolbarName } from '@collboard/modules-sdk';
import * as React from 'react';
import { TouchFrame } from 'touchcontroller';
import { SampleArt } from './SampleArt';
import packageJson from '../package.json';

declareModule(
    makeIconModuleOnModule({
        manifest: {
            name: 'SampleTool',
            title: { en: 'Drawing', cs: 'Kreslení' },
            categories: ['Basic', 'Art'],
            ...packageJson,
        },
        toolbar: ToolbarName.Tools,
        icon: ({ attributesSystem }) => ({
            autoSelect: true,
            section: 2,
            char: '✒️',
            boardCursor: 'crosshair',
            menu: () => (
                <>
                    {attributesSystem.inputRender('weight')}
                    <Separator />
                    {attributesSystem.inputRender('color')}
                    <Separator />
                    {attributesSystem.inputRender('dashpattern')}
                </>
            ),
        }),
        moduleActivatedByIcon: {
            setup: ({ touchController, appState, attributesSystem, materialArtVersioningSystem, collSpace }) => {
                return Registration.fromSubscription((registerAdditionalSubscription) =>
                    touchController.touches.subscribe({
                        next: (touch) => {
                            appState.cancelSelection();

                            const artInProcess = new SampleArt(
                                [],
                                attributesSystem.getAttributeValue('color') as string,
                                attributesSystem.getAttributeValue('dashpattern') as string,
                                attributesSystem.getAttributeValue('weight') as number,
                            );

                            const operation = materialArtVersioningSystem.createPrimaryOperation();
                            operation.newArts(artInProcess);

                            registerAdditionalSubscription(
                                touch.frames.subscribe({
                                    next: (touchFrame) => {
                                        artInProcess.path.push(collSpace.pickPoint(touchFrame.position).point);
                                        operation.update(artInProcess);
                                    },
                                    complete: () => {
                                        operation.persist();
                                    },
                                }),
                            );
                        },
                    }),
                );
            },
        },
    }),
);
