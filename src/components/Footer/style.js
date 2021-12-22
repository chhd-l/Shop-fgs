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
`;
