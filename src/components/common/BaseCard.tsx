'use client';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  backgroundImage?: string;
  onClick?: () => void;
  isSelected?: boolean;
  selectedClassName?: string;
  defaultClassName?: string;
}

/**
 * 모노크롬 스위스 그리드: 라운드·그림자·확대 없음.
 * 구분은 괘선과 면의 명도로만 만든다.
 */
export const BaseCard = (props: BaseCardProps) => {
  const {
    children,
    className = "",
    backgroundImage,
    onClick,
    isSelected,
    selectedClassName = "",
    defaultClassName = "bg-card-soft"
  } = props;

  const bgClass = isSelected !== undefined
    ? (isSelected ? selectedClassName : defaultClassName)
    : defaultClassName;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden border border-line p-4 transition-colors duration-200 ${bgClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {backgroundImage && (
        <div
          className="img-mono absolute inset-0 bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col">
        {children}
      </div>
    </div>
  )
}
