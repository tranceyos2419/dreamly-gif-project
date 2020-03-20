import React from 'react'
import styled, { css } from "styled-components";

interface Props {
   height:string
}

const StyledSpacer = styled.div<Props>(
    ({height}) => css`
      height:${height}
    `
  );

const Spacer = (props: Props) => {
    return (
        <StyledSpacer height={props.height} />
    )
}

export default Spacer
