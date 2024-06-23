import React from 'react';
import { classNames } from '@/shared/helpers/classNames/classNames';
import cls from './AppIcon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  size?: number;
}

export const Icon = (props: IconProps) => {
  const { className = '', Svg, size = 24, ...otherProps } = props;

  return (
    <Svg
      className={classNames(cls.icon, {}, [className])}
      height={size}
      width={size}
      preserveAspectRatio={'xMidYMid meet'}
      {...otherProps}
    />
  );
};
