import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  .hub-footer {
    h3 {
      & > a {
        color: #ffffff !important;
        font-weight: 500;
      }
    }
  }
  @media screen and (min-width: 767px) {
    .hub-footer {
      .rc-list--footer-columns {
        page-break-inside: avoid;
        break-inside: avoid;
        column-count: 6;
        display: block;
        & > .rc-list__item {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      }
    }
  }
  // /* footer手机端交互 */
  .rc-list-overwrite {
    .icon-down {
      display: none;
    }
  }
  @media (max-width: 768.98px) {
    .rc-list-overwrite {
      .icon-down {
        display: inline-block;
      }
      .rc-list__header {
        background: transparent;
        padding-right: 0.5rem;
        &::after {
          display: none;
        }
        & + .rc-list {
          max-height: 0 !important;
        }
        &.rc-list__header-open {
          & + .rc-list {
            max-height: initial !important;
          }
          .icon-down {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    #mars-footer-panel {
      .mars-footer-list-right {
        li {
          margin: 0 !important;
          padding: 0 !important;
          line-height: normal !important;
          border-left: 1px solid #d5effa !important;
        }
      }
    }
    .mars-footer-list-right {
      li {
        float: left;
      }
    }
    .mars-footer-legal {
      clear: both;
      margin-bottom: 10px !important;
      color: #a0a0a0;
      font-family: Verdana, sans-serif !important;
      font-size: 11px !important;
      width: auto !important;
      clear: both;
    }
  }
  #mars-footer-panel {
    background-color: #333333;
    .mars-footer-container {
      margin: 0 auto !important;
      padding-bottom: 25px;
      min-width: 10% !important;
      max-width: 93% !important;
      color: #fff;
    }
    .mars-footer-list-right {
      font-weight: 700;
      width: 100%;
      font-size: 0.625rem;
      color: #fff;
      text-align: center;
    }
    li {
      margin: 15px 0 0 !important;
      padding: 0 5px !important;
      line-height: 1.3125rem;
      display: inline;
      &:first-child {
        padding-left: 0 !important;
        margin-left: 0 !important;
        border: none !important;
      }
    }
    a {
      font-weight: 700;
      text-decoration: none;
      color: #a0a0a0;
    }
    p {
      font-family: Arial, Verdana, sans-serif !important;
      font-size: 11px !important;
      font-weight: 400 !important;
    }
  }
  .mars-footer-label {
    font-size: 11px !important;
    padding: 0 7px;
    color: #a0a0a0;
  }
`;
