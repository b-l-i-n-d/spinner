/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useSpinnerContext } from "../../context/spinner-context";

interface IWheelComponentProps {
    winningSegment?: string;
    onFinished: (currentSegment: string) => void;
    primaryColor?: string;
    contrastColor?: string;
    buttonText?: string;
    isOnlyOnce?: boolean;
    size?: number;
    upDuration?: number;
    downDuration?: number;
    fontFamily?: string;
    className?: string;
}

const WheelComponent = ({
    onFinished,
    isOnlyOnce = true,
    size = 300,
    upDuration = 100,
    downDuration = 1000,
    fontFamily = "Inter",
    className,
}: IWheelComponentProps) => {
    const { spinnerData, isSpinning } = useSpinnerContext();
    let currentSegment = "";
    const [isFinished, setFinished] = useState(false);
    let timerHandle = 0;
    const timerDelay = spinnerData.length;
    let angleCurrent = 0;
    let angleDelta = 0;
    let frames = 0;
    let canvasContext = null as CanvasRenderingContext2D | null;
    let maxSpeed = Math.PI / spinnerData.length;
    const upTime = spinnerData.length * upDuration;
    const downTime = spinnerData.length * downDuration;
    let spinStart = 0;
    const centerX = size;
    const centerY = size;

    useEffect(() => {
        wheelInit();
        setTimeout(() => {
            window.scrollTo(0, 1);
        }, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const wheelInit = () => {
        initCanvas();
        wheelDraw();
    };

    const initCanvas = () => {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (navigator.userAgent.indexOf("MSIE") !== -1) {
            canvas = document.createElement("canvas") as HTMLCanvasElement;
            canvas.setAttribute("width", `${size * 2}`);
            canvas.setAttribute("height", `${size * 2}`);
            canvas.setAttribute("id", "canvas");
            document.getElementById("wheel")?.appendChild(canvas);
        }
        canvas.addEventListener("click", spin, false);
        canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    };
    const spin = () => {
        if (timerHandle === 0) {
            spinStart = new Date().getTime();
            // maxSpeed = Math.PI / ((spinnerData.length*2) + Math.random())
            maxSpeed = Math.PI / spinnerData.length;
            frames = 0;
            timerHandle = setInterval(onTimerTick, timerDelay);
        }
    };
    const onTimerTick = () => {
        frames++;
        draw();
        const duration = new Date().getTime() - spinStart;
        let progress = 0;
        let finished = false;
        if (duration < upTime) {
            progress = duration / upTime;
            angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
        } else {
            progress = duration / downTime;
            angleDelta =
                maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);

            if (progress >= 1) finished = true;
        }

        angleCurrent += angleDelta;
        while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
        if (finished) {
            setFinished(true);
            // setIsSpinning(false);
            onFinished(currentSegment);
            clearInterval(timerHandle);
            timerHandle = 0;
            angleDelta = 0;
        }
    };

    const wheelDraw = () => {
        clear();
        drawWheel();
        drawNeedle();
    };

    const draw = () => {
        clear();
        drawWheel();
        drawNeedle();
    };

    const drawSegment = (key: number, lastAngle: number, angle: number) => {
        const ctx = canvasContext;
        const value = spinnerData[key].label;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, size, lastAngle, angle, false);
            ctx.lineTo(centerX, centerY);
            ctx.closePath();
            ctx.shadowColor = "gray";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillStyle = spinnerData[key].color;
            ctx.fill();
            ctx.stroke();
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate((lastAngle + angle) / 2);
            ctx.fillStyle = "white";
            ctx.font = "bold 1.5rem " + fontFamily;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
            ctx.restore();
        }
    };

    const drawWheel = () => {
        const ctx = canvasContext;
        let lastAngle = angleCurrent;
        const len = spinnerData.length;
        const PI2 = Math.PI * 2;
        if (ctx) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = "white";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
        }
        for (let i = 1; i <= len; i++) {
            const angle = PI2 * (i / len) + angleCurrent;
            drawSegment(i - 1, lastAngle, angle);
            lastAngle = angle;
        }
    };

    const drawNeedle = () => {
        const change = angleCurrent + Math.PI / 2;
        let i =
            spinnerData.length -
            Math.floor((change / (Math.PI * 2)) * spinnerData.length) -
            1;
        if (i < 0) i = i + spinnerData.length;
        currentSegment = spinnerData[i].id;
    };
    const clear = () => {
        const ctx = canvasContext as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, size * 2, size * 2);
    };

    useEffect(() => {
        if (isSpinning) {
            document.getElementById("canvas")?.click();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSpinning]);
    return (
        <canvas
            className={className}
            id="canvas"
            width={size * 2}
            height={size * 2}
            style={{
                pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
                transform: "rotate(90deg)",
            }}
        />
    );
};
export default WheelComponent;
