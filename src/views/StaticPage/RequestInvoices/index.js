import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.css';
import { FormattedMessage } from 'react-intl-phraseapp';
import { seoHoc } from '@/framework/common';
import { Canonical } from '@/components/Common';

@seoHoc()
class RequestInvoices extends React.Component {
  render() {
    return (
      <div>
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <div className="RequestInvoices">
          <h1>
            <FormattedMessage id="requestInvoices.title" />
          </h1>
          <p>
            Si desea solicitar facturas electrónicas, le pedimos por favor envíe
            la siguiente información al:
          </p>
          <p>
            correo electrónico <strong>contacto.mex@royalcanin.com</strong> con
            el siguiente formato en el asunto del correo:
          </p>
          <br />
          <p>
            Solicitar factura_tu nombre_ Fecha de aplicación(Día,Mes,Año)
            <br />
            <strong>Ejemplo: </strong> Solicitar factura_Hugo Reyes_21072020).
          </p>
          <br />
          {/* <p classname="textIndex">
            La facturación automática está en preparación. Por ahora, si desea
            solicitar facturas electrónicas, envíe la siguiente información a la
            dirección de correo electrónico ‘contacto.mex@royalcanin.com’ con el
            título de correo electrónico de ‘Solicitar factura_tu nombre_ Fecha
            de aplicación’ (por ejemplo, Solicitar factura_Calvin_21072020).{' '}
          </p> */}
          <p>Información requerida para la facturación:</p>
          <ol style={{ paddingLeft: '25px' }}>
            <li>
              <span style={{ paddingRight: '15px' }}>-</span>Nombre, Razón o
              Denominación Social
            </li>
            <li>
              <span style={{ paddingRight: '15px' }}>-</span>RFC
            </li>
            <li>
              <span style={{ paddingRight: '15px' }}>-</span>Dirección fiscal
              (Calle, Número int/ext, Colonia, Delegación o Municipio, Estado y
              Código postal)
            </li>
            <li>
              <span style={{ paddingRight: '15px' }}>-</span>Uso del tipo de
              CFDI (indicando una de las opciones)
              <ul style={{ paddingLeft: '55px' }}>
                <li>G01 Adquisición de Mercancías</li>
                <li>G03 Gastos Generales</li>
              </ul>
            </li>
            <li>
              <span style={{ paddingRight: '15px' }}>-</span>Forma de Pago
              (indicando una de las opciones)
              <ul style={{ paddingLeft: '55px' }}>
                <li>Contado (Pagos en OXXO)</li>
                <li>Tarjeta de crédito o débito</li>
              </ul>
            </li>
            <li>
              <span style={{ paddingRight: '15px' }}>-</span>Número de pedido
              (Puede encontrarlo en su correo de confirmación de pedido)
            </li>
            <li>
              <span style={{ paddingRight: '15px' }}>-</span>Valor total del
              pedido o valor de la factura
            </li>
            <li>
              <span style={{ paddingRight: '15px' }}>-</span>Dirección de correo
              electrónico para recibir facturas
            </li>
          </ol>
          <br />
          <p>
            Por lo general, el proceso de facturación puede demorar hasta 1
            semana, la factura se enviará a la dirección que dejó en el correo
            electrónico de solicitud de factura.
          </p>
          <br />
          <p>
            Ante cualquier inquietud, comuníquese con por favor al correo:
            contacto.mex@royalcanin.com
          </p>
          {/* <p>
            Tenga en cuenta que, por lo general, el proceso de facturación
            demorará hasta 1 semana y la factura se enviará a la dirección que
            dejó en el correo electrónico de solicitud de factura. Por lo tanto,
            preste atención a su bandeja de entrada de correo electrónico a su
            debido tiempo.
          </p>

          <p>
            Ante cualquier inquietud, comuníquese con
            ‘contacto.mex@royalcanin.com’. Gracias.
          </p> */}
        </div>
        <Footer />
      </div>
    );
  }
}
export default RequestInvoices;
