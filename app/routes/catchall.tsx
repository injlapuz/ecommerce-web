export function meta() {
    return [
        { title: "Page Not Found" },
        {
            name: "description",
            content: "The page you are looking for does not exist.",
        }
    ]
}

export default function CatchAll() {
    return (
        <div className="flex-1 flex flex-col">
            <div className="bg-black flex-2 flex flex-col items-center justify-center"></div>
            <div className="bg-red-50 flex-1">404 - Page Not Found</div>
        </div>
    );
}