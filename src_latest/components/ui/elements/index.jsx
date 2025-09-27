import React from 'react';
import {CustomButton,CustomTextField, SmallButton,CustomTypography,LargeButton} from './styles';

export const Button = ({ children, ...props }) => {
    return <CustomButton {...props}>{children}</CustomButton>;
};

export const Buttons = ({ children, ...props }) => {
    return <SmallButton {...props}>{children}</SmallButton>;
};

export const Buttonz = ({ children, ...props }) => {
    return <LargeButton {...props}>{children}</LargeButton>;
};

export const TextField = ({ children, ...props }) => {
    return <CustomTextField {...props}>{children}</CustomTextField>;
};

export const Typography = ({ children, ...props }) => {
    return <CustomTypography {...props}>{children}</CustomTypography>;
};