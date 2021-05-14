import * as React from 'react';
import { IconColor } from '../30-components/menu/Icon';
import { Authors } from '../50-systems/ModuleStore/Authors';
import { internalModules } from '../50-systems/ModuleStore/internalModules';
import { makeAttributeModule } from '../50-systems/ModuleStore/makers/makeAttributeModule';
import { DRAWING_COLORS } from '../config';

internalModules.declareModule(
    makeAttributeModule<string>({
        manifest: {
            // Note: This art module is not auto-activated on initialization because when it appears on the board or in some toolbar, it will be auto-activated afterward.
            name: 'ColorAttribute',
            title: { en: 'TODO:', cs: 'TODO:' },
            description: { en: 'TODO:', cs: 'TODO:' },
            keywords: [],
            icon: 'TODO:',
            screenshots: [
                /*TODO:*/
            ],
            contributors: [Authors.rosecky, Authors.hejny],
            categories: ['Colors'],
        },
        standard: true,
        attribute: {
            type: 'string',
            name: 'color',
            defaultValue: DRAWING_COLORS.black,
            // TODO: pattern:
        },
        inputRender: (value: string, onChange: (value: string) => void) => (
            <>
                {Object.keys(DRAWING_COLORS).map((key) => (
                    <IconColor
                        key={key}
                        color={DRAWING_COLORS[key]}
                        active={value === DRAWING_COLORS[key]}
                        onClick={() => onChange(DRAWING_COLORS[key])}
                    />
                ))}
            </>
        ),
    }),
);
