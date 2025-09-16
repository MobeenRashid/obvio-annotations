import ObvioLogo from './obvio-logo';
import cn from 'clsx';

const ObvioAnnotationsLogo = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn('relative cursor-pointer w-fit mt-6 mb-1', className)}
      onClick={onClick}
    >
      <ObvioLogo />
      <span className="bg-gray-200 text-gray-80 text-[10px] font-semibold px-[6px] py-[2px] rounded-lg absolute -end-8 -top-[20px]">
        Annotations
      </span>
    </div>
  );
};

export default ObvioAnnotationsLogo;
