import * as React from 'react';
import { TouchFrame } from 'touchcontroller';
import { Separator } from '../30-components/menu/Separator';
import { Registration } from '../40-utils/destroyables/Registration';
import { Authors } from '../50-systems/ModuleStore/Authors';
import { internalModules } from '../50-systems/ModuleStore/internalModules';
import { makeIconModuleOnModule } from '../50-systems/ModuleStore/makers/makeIconModuleOnModule';
import { ToolbarName } from '../50-systems/ToolbarSystem/0-ToolbarSystem';
import { FreehandArt } from '../71-arts/50-FreehandArt';

// TODO: !!! makeIconModuleOnModule better name

internalModules.declareModule(
    makeIconModuleOnModule({
        manifest: {
            name: 'FreehandTool',
            title: { en: 'Drawing', cs: 'Kreslení' },
            // Note: for basic modules omitting the description: { en: '', cs: '' },
            keywords: [],
            categories: ['Basic', 'Art'],
            icon: '/assets/icons/pen.svg',
            screenshots: [
                /*TODO:*/
            ],
            author: Authors.collboard,
        },
        toolbar: ToolbarName.Tools,
        icon: ({ attributesSystem }) => ({
            name: 'freehand' /* For triggering externally */,
            autoSelect: true,
            order: 10,
            section: 0,
            icon: 'pen',
            boardCursor: 'crosshair',
            menu: () => (
                <>
                    {attributesSystem.inputRender('weight')}
                    <Separator />
                    {attributesSystem.inputRender('color')}
                </>
            ),
        }),
        moduleActivatedByIcon: {
            setup: ({ touchController, appState, attributesSystem, materialArtVersioningSystem, collSpace }) => {
                return Registration.fromSubscription((registerAdditionalSubscription) =>
                    touchController.touches.subscribe((touch) => {
                        appState.cancelSelection();

                        const artInProcess = new FreehandArt(
                            [],
                            attributesSystem.getAttributeValue('color') as string,
                            attributesSystem.getAttributeValue('weight') as number,
                        );

                        const operation = materialArtVersioningSystem.createPrimaryOperation();
                        operation.newArts(artInProcess);

                        registerAdditionalSubscription(
                            touch.frames.subscribe(
                                (touchFrame) => {
                                    const frame = touchFrameToFreehandArtFrame(touchFrame);
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
function touchFrameToFreehandArtFrame(
    frame: TouchFrame /* TODO: bit hack because TC does not export TouchFrame*/,
): TouchFrame /*Pick<TouchFrame, 'position' | 'time'>*/ {
    return frame;
    /*return {
        position: frame.position,
        time: Math.floor(frame.time || 0),
    };*/
}
