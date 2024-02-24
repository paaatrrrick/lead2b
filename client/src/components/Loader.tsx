
type LoaderProps = {
    text?: string,
    className?: string,
}

export function Loader({text, className} : LoaderProps) {
    const parentClass = className ? className : 'full-screen-loader';
    return (
      <div className={parentClass}>
        <div className="flex items-center justify-center">
          {text && <p className="text-lg mr-4">{text}</p>}
          <span className="loader"></span>
        </div>
      </div>
    );
  }