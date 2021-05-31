import { declareModule, IconColor, makeAttributeModule } from '@collboard/modules-sdk';
import * as React from 'react';

export const DRAWING_COLORS: { [key: string]: string } = {
    black: '#000000',
    blue: '#3167A4',
    red: '#EE2333',
    green: '#40B93C',
    orange: '#F36717',
    yellow: '#EDF050',
    white: '#FFFFFF',
};

declareModule(
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
            categories: ['Colors'],
            // TODO: !! Authors should be derived from package.json
        },
        standard: true,
        attribute: {
            type: 'string',
            name: 'fillcolor',
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
