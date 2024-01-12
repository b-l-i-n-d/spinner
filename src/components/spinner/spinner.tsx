import { useEffect, useRef, useState } from "react";

export const Spinner = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [discountsData] = useState<
        {
            color: string;
            label: string;
            type: "percent" | "amount";
            value: number;
        }[]
    >([
        {
            color: "#ca7",
            label: "Amazon gift voucher",
            type: "amount",
            value: 200,
        },
        {
            color: "#7ac",
            label: "50",
            type: "percent",
            value: 50,
        },
        {
            color: "#77c",
            label: "100",
            type: "percent",
            value: 100,
        },
        {
            color: "#aac",
            label: "5",
            type: "percent",
            value: 5,
        },
        {
            color: "#a7c",
            label: "500",
            type: "percent",
            value: 500,
        },
        {
            color: "#ac7",
            label: "0",
            type: "percent",
            value: 0,
        },
        {
            color: "#caa",
            label: "new",
            type: "percent",
            value: 0,
        },
        {
            color: "#000",
            label: "new2",
            type: "percent",
            value: 0,
        },
        {
            color: "#000FFF",
            label: "new3",
            type: "percent",
            value: 0,
        },
    ]);
    const [stopAngel] = useState<number[]>([]);
    const slices = discountsData.length;
    const sliceDeg = 360 / slices;
    let deg = 260;
    // let speed = 5;
    // let slowDownRand = 0;
    // let isStopped = false;
    // let lock = false;

    // const rand = (min: number, max: number) =>
    //     Math.random() * (max - min) + min;
    const oddEven = (num: number) => num % 2 === 1;

    const deg2rad = (deg: number) => (deg * Math.PI) / 180;

    const drawSlice = (index: number, deg: number, color: string) => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            let sAngel;
            let current = index <= 0 ? deg : stopAngel[index - 1];

            if (oddEven(index)) {
                sAngel =
                    current <= 0
                        ? Math.abs(Math.floor(260 + sliceDeg + 10))
                        : Math.abs(Math.floor(current - sliceDeg + 10));
            } else {
                sAngel =
                    current <= 0
                        ? Math.abs(Math.floor(260 + sliceDeg - 10))
                        : Math.abs(Math.floor(current - sliceDeg - 10));
            }

            current = sAngel;
            stopAngel.push(current);

            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.moveTo(center, center);
            ctx.arc(
                center,
                center,
                center,
                deg2rad(deg),
                deg2rad(deg + sliceDeg),
                false
            );
            ctx.lineTo(center, center);
            ctx.fill();
        }
    };

    const drawText = (deg: number, text: string) => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(deg2rad(deg));
            ctx.textAlign = "center";
            ctx.fillStyle = "#fff";
            ctx.font = "32px";
            ctx.fillText(text, 130, 10);
            ctx.restore();
        }
    };

    const drawImg = () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, width, width);

            for (let i = 0; i < slices; i++) {
                drawSlice(i, deg, discountsData[i].color);
                drawText(deg + sliceDeg / 2, discountsData[i].label);
                deg += sliceDeg;
            }
        }
    };

    // const anim = () => {
    //     isStopped = true;
    //     deg += speed;
    //     deg %= 360;

    //     if (!isStopped && speed < 3) {
    //         speed = speed + 2 * 0.9;
    //     }

    //     if (isStopped) {
    //         if (!lock) {
    //             lock = true;
    //             slowDownRand = rand(0.994, 0.998);
    //         }
    //         speed = speed > 0.2 ? (speed *= slowDownRand) : 0;
    //     }

    //     if (lock && !speed) {
    //         deg = 208;
    //     }

    //     drawImg();
    //     requestAnimationFrame(anim);
    // };

    const start = () => {
        const ele = canvasRef.current;
        ele?.classList.add("spin-wheel");

        setTimeout(() => {
            ele?.classList.remove("spin-wheel");
            deg = stopAngel[5];
            drawImg();
        }, 3000);
    };

    const center = 270;
    const width = 540;

    useEffect(() => {
        drawImg();
    }, []);

    return (
        <div className="wheel">
            <canvas ref={canvasRef} width={width} height={width}></canvas>
            <button onClick={start}>Start</button>
        </div>
    );
};
