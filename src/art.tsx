import { Abstract2dArt, classNames, declareModule, makeArtModule } from '@collboard/modules-sdk';
import * as React from 'react';
import { TouchFrame } from 'touchcontroller';
import { IVector, Vector } from 'xyzt';

export const SVG_PADDING = 10;
export const IS_NEAR_DISTANCE = 20;

export class SampleArt extends Abstract2dArt {
    public frames: TouchFrame[];
    public color: string;
    public fillcolor: string;
    public weight: number;
    private minX: number = 0;
    private maxX: number = 0;
    private minY: number = 0;
    private maxY: number = 0;

    constructor(frames: TouchFrame[], color: string, fillcolor: string, weight: number) {
        // TODO: Sample line style
        super();
        this.frames = frames;
        this.color = color;
        this.fillcolor = fillcolor;
        this.weight = weight;
    }

    private get path(): string {
        return this.frames
            .map((frame, i) => {
                const pointRelative = Vector.subtract(
                    frame.position,
                    new Vector(this.minX - SVG_PADDING, this.minY - SVG_PADDING),
                );
                return `${i === 0 ? 'M' : 'L'}${pointRelative.x} ${pointRelative.y}`;
            })
            .join(' ');
    }

    get topLeftCorner() /* TODO: This should be done by BoundingBox from xyzt */ {
        return new Vector(this.minX, this.minY).add(this.shift);
    }
    get bottomRightCorner() /* TODO: This should be done by BoundingBox from xyzt */ {
        return new Vector(this.maxX, this.maxY).add(this.shift);
    }
    get size() {
        return this.bottomRightCorner.subtract(this.topLeftCorner);
    }
    set size(newSize: IVector) {
        try {
            const scaleX = (newSize.x || 0) / (this.maxX - this.minX);
            const scaleY = (newSize.y || 0) / (this.maxY - this.minY);

            this.frames.forEach((frame) => {
                const position = frame.position as any;
                position.x = (frame.position.x || 0) * scaleX;
                position.y = (frame.position.y || 0) * scaleY;
            });
            this.calculateBoundingBox();
        } catch (e) {
            this.calculateBoundingBox();
        }
    }

    isNear(point2: IVector) {
        // Should detect even near lines, but this is good enough
        return (
            this.frames.filter((frame1) => Vector.add(frame1.position, this.shift).distance(point2) <= IS_NEAR_DISTANCE)
                .length > 0
        );
    }

    get acceptedAttributes() {
        return ['color', 'weight', 'size'];
    }

    private calculateBoundingBox() {
        // TODO: Maybe use BoundingBox from TouchController

        const xVals = this.frames.map((frame) => frame.position.x || 0);
        const yVals = this.frames.map((frame) => frame.position.y || 0);

        this.minX = Math.min.apply(null, xVals);
        this.maxX = Math.max.apply(null, xVals);
        this.minY = Math.min.apply(null, yVals);
        this.maxY = Math.max.apply(null, yVals);
    }

    render(selected: boolean) {
        this.calculateBoundingBox();
        return (
            <div
                className={classNames('art', selected && 'selected')}
                style={{
                    position: 'absolute',
                    left: this.minX - SVG_PADDING + (this.shift.x || 0),
                    top: this.minY - SVG_PADDING + (this.shift.y || 0),
                }}
            >
                <svg
                    width={this.maxX - this.minX + 2 * SVG_PADDING}
                    height={this.maxY - this.minY + 2 * SVG_PADDING}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <path
                            d={this.path}
                            stroke={this.color}
                            strokeWidth={this.weight}
                            fillOpacity="null"
                            strokeOpacity="null"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill={this.fillcolor}
                            className="collisions"
                        />
                    </g>
                </svg>
            </div>
        );
    }
}

declareModule(() =>
    makeArtModule({
        name: 'Sample',
        class: SampleArt,
    }),
);
