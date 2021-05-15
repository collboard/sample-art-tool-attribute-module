import { declareModule, makeIconModuleOnModule, Registration, Separator, ToolbarName } from '@collboard/modules-sdk';
import * as React from 'react';
import { TouchFrame } from 'touchcontroller';
import { SampleArt } from './art';

declareModule(
    makeIconModuleOnModule({
        manifest: {
            name: 'SampleTool',
            title: { en: 'Drawing', cs: 'Kreslení' },
            // Note: for basic modules omitting the description: { en: '', cs: '' },
            keywords: [],
            categories: ['Basic', 'Art'],
            icon: '/assets/icons/pen.svg',
            screenshots: [
                /*TODO:*/
            ],
            // TODO: !!! Derive all from package
            // TODO: !!! Authors should be derived from package.json
        },
        toolbar: ToolbarName.Tools,
        icon: ({ attributesSystem }) => ({
            autoSelect: true,
            order: 100,
            section: 0,
            char: '⭐',
            boardCursor: 'crosshair',
            menu: () => (
                <>
                    {attributesSystem.inputRender('weight')}
                    <Separator />
                    {attributesSystem.inputRender('color')}
                    <Separator />
                    {attributesSystem.inputRender('fillcolor')}
                </>
            ),
        }),
        moduleActivatedByIcon: {
            setup: ({ touchController, appState, attributesSystem, materialArtVersioningSystem, collSpace }) => {
                return Registration.fromSubscription((registerAdditionalSubscription) =>
                    touchController.touches.subscribe((touch) => {
                        appState.cancelSelection();

                        const artInProcess = new SampleArt(
                            [],
                            attributesSystem.getAttributeValue('color') as string,
                            attributesSystem.getAttributeValue('fillcolor') as string,
                            attributesSystem.getAttributeValue('weight') as number,
                        );

                        const operation = materialArtVersioningSystem.createPrimaryOperation();
                        operation.newArts(artInProcess);

                        registerAdditionalSubscription(
                            touch.frames.subscribe(
                                (touchFrame) => {
                                    const frame = touchFrameToSampleArtFrame(touchFrame);
                                    frame.position = collSpace.pickPoint(frame.position).point;

                                    artInProcess.frames.push(frame);
                                    operation.update(artInProcess);
                                },
                                () => {},
                                () => {
                                    operation.persist();
                                },
                            ),
                        );
                    }),
                );
            },
        },
    }),
);

/**
 * TODO: Is this util usefull?
 */
function touchFrameToSampleArtFrame(
    frame: TouchFrame /* TODO: bit hack because TC does not export TouchFrame*/,
): TouchFrame /*Pick<TouchFrame, 'position' | 'time'>*/ {
    return frame;
    /*return {
        position: frame.position,
        time: Math.floor(frame.time || 0),
    };*/
}
