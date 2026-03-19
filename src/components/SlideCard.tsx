type SlideCardProps = {
  number: number;
  title: string;
  code: string;
  description: string;
  accent?: string;
};

const SlideCard = ({ number, title, code, description, accent = '#FBBF24' }: SlideCardProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 rounded-2xl bg-card border border-border overflow-hidden select-none">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold mono" style={{ color: accent }}>#{number}</span>
        <span className="text-[8px] text-muted-foreground mono">python</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <code className="text-[9px] sm:text-[10px] mono font-semibold text-secondary leading-tight text-center break-all px-1">
          {code}
        </code>
      </div>
      <div className="mt-1">
        <p className="text-[9px] font-semibold text-foreground leading-tight truncate">{title}</p>
        <p className="text-[8px] text-muted-foreground leading-tight mt-0.5 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default SlideCard;
