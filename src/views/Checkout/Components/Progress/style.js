import styled from 'styled-components';

export const DivWrapper = styled.div`
  .icon-step {
    display: inline-block;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    text-align: center;
    line-height: 1.5em;
    background: transparent;
    border-width: 1px;
    border-color: grey;
    &.active {
      color: var(--rc-red);
      border-color: var(--rc-red);
    }
    &.complete {
      background: var(--rc-red);
      border-color: var(--rc-red);
      color: white;
    }
  }
`;
