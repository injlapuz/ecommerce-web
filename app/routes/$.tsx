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
            <div className="flex-1 flex items-center justify-center">
                { /*<p className="font-bold text-2xl"> 404 - Page Not Found</p>*/}
                <span className="loading loading-spinner text-primary loading-xl"></span>
            </div>
        </div>
    );
}