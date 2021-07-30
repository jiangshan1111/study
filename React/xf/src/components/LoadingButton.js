import React from 'react';
import { Button } from 'antd';
const LoadingButton = ({ title, type }) => {
  return (
    <Button type={type} loading>{title}</Button>
  )
}
export default LoadingButton;