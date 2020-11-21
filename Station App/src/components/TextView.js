import React from 'react';
import {View, Text} from 'react-native';

const TextView = ({
  margin,
  padding,
  bgColor,
  color,
  size,
  bold,
  center,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  style,
  children,
  ...props
}) => {
  const styleComponet = [
    {fontSize: 14},
    margin && {margin},
    padding && {padding},
    bgColor && {backgroundColor: bgColor},
    color && {color},
    size && {fontSize: size},
    bold && {fontWeight: 'bold'},
    h1 && {fontSize: 44, fontWeight: 'bold'},
    h2 && {fontSize: 38, fontWeight: 'bold'},
    h3 && {fontSize: 32, fontWeight: 'bold'},
    h4 && {fontSize: 28, fontWeight: 'bold'},
    h5 && {fontSize: 22, fontWeight: 'bold'},
    h6 && {fontSize: 18},
    center && {textAlign: 'center'},
    style,
  ];
  return (
    <Text style={styleComponet} {...props}>
      {children}
    </Text>
  );
};

export default TextView;