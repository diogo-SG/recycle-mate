import React from 'react';
import classNames from 'classnames';

// NOTE: The comments below serve as metadata for the Storybook docs page
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * What kind of heading is it? Use regular html tags and 'p' for sub-headings.
   */
  kind: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  /**
   * The heading colour. Defaults to 'text-black'
   */
  color?: string;
}

export function Heading({
  kind = 'h1',
  color = 'text-black',
  children,
  className,
}: HeadingProps) {
  const HeadingTag = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(kind, props, children);

  const dynamicStyles = {
    // base: '',
    h1: 'font-caudex font-bold text-2xl md:text-3xl',
    h2: 'font-caudex font-bold text-xl md:text-2xl',
    h3: 'font-caudex font-bold text-lg md:text-xl',
    h4: 'font-caudex font-normal text-base md:text-xl',
    h5: 'font-caudex font-bold text-base md:text-lg',
    h6: 'font-nunito font-bold text-sm md:text-base',
    p: 'font-nunito font-light text-sm md:text-base',
  };

  return (
    <HeadingTag
      className={classNames(`${color}`, {
        [`${className}`]: className,
        [`${dynamicStyles.h1}`]: kind === 'h1',
        [`${dynamicStyles.h2}`]: kind === 'h2',
        [`${dynamicStyles.h3}`]: kind === 'h3',
        [`${dynamicStyles.h4}`]: kind === 'h4',
        [`${dynamicStyles.h5}`]: kind === 'h5',
        [`${dynamicStyles.h6}`]: kind === 'h6',
        [`${dynamicStyles.p}`]: kind === 'p',
      })}
    >
      {children}
    </HeadingTag>
  );
}

export default Heading;
