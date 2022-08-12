import styled from 'styled-components';

export const DivWrapper = styled.div`
  .icon-step {
    display: inline-block;
    border-radius: 50%;
    width: 1.8em;
    height: 1.8em;
    text-align: center;
    line-height: 1.4em;
    background: transparent;
    border-width: 2px;
    border-color: grey;
    font-weight: 500;
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
