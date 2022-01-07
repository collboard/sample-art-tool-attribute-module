// Note: We are using library destroyable and xyzt which is published under @hejny (creator of Collboard) but probbly it should be also published under @collboard to make clear that it is an integral part of Collboard stack.
import { declareModule, makeIconModuleOnModule, Separator, ToolbarName } from '@collboard/modules-sdk';
import { Registration } from 'destroyable';
import * as React from 'react';
import { contributors, description, license, repository, version } from '../package.json';
import { SampleArt } from './SampleArt';

declareModule(
    makeIconModuleOnModule({
        manifest: {
            name: '@collboard/module-sample-objects/sample-tool',
            version,
            description,
            contributors,
            license,
            repository,
            title: { en: 'Drawing of dotted and dashed lines', cs: 'Kreslení přerušovaných čar' },
            categories: ['Basic', 'Art', 'Experimental'],
            icon: '✒️',
            flags: {
                isTemplate: true,
            },
        },
        toolbar: ToolbarName.Tools,
        async icon(systems) {
            const { attributesSystem } = await systems.request('attributesSystem');
            return {
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
            };
        },
        moduleActivatedByIcon: {
            async setup(systems) {
                const { touchController, appState, attributesSystem, materialArtVersioningSystem, collSpace } =
                    await systems.request(
                        'touchController',
                        'appState',
                        'attributesSystem',
                        'materialArtVersioningSystem',
                        'collSpace',
                    );

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
