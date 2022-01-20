import styled from 'styled-components';

export const DivWrapper = styled.div`
  .rc-input__control-overwrite {
    display: block;
    line-height: 1.5rem;
    width: 100%;
    margin-bottom: 0;
    padding: 0.95rem 0;
    font-weight: 300;
    box-shadow: none;
    border: #d7d7d7;
    background-color: transparent;
    color: #666;
    + .rc-input__label-overwrite {
      color: #d7d7d7;
    }
    &:focus {
      & + .rc-input__label-overwrite {
        color: #666;
        &::after {
          width: 100%;
        }
      }
    }
    &:not([value='']) {
      & + .rc-input__label-overwrite {
        color: #666;
      }
      & ~ .rc-input__label-overwrite .rc-input__label-text-overwrite {
        transform: translateY(-2.8em);
        padding-left: 0;
        font-size: 0.7rem;
      }
    }
  }
  .rc-input__label-overwrite {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      z-index: 2;
      transition: 0.2s;
      background-color: #d7d7d7;
      width: 100%;
    }
    &:after {
      z-index: 3;
      width: 0;
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      transition: 0.2s;
    }
  }
  .rc-input__label-text-overwrite {
    display: inline-block;
    padding: 0.95rem 0;
    text-indent: 1px;
    font-weight: 500;
    white-space: nowrap;
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }
  .rc-input--error > [class^='rc-input'] {
    color: #c03344;
    border-color: #c03344;
    & + .rc-input__label-overwrite {
      color: #c03344;
      &::before {
        background-color: #c03344;
      }
    }
  }
  @media (max-width: 768.98px) {
    .rc-input__control-overwrite {
      &:not([value='']) {
        & ~ .rc-input__label-overwrite .rc-input__label-text-overwrite {
          transform: translateY(-2em);
        }
      }
    }
  }
`;
