import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.css';
import { FormattedMessage } from 'react-intl';
import { setSeoConfig } from '@/utils/utils';
export default function RequestInvoices(props) {
  setSeoConfig()
  return (
    <div>
      <Header
        showMiniIcons={true}
        showUserIcon={true}
        match={this.props.match}
      />
      <div className="RequestInvoices">
        <h1>
          <FormattedMessage id="requestInvoices.title" />
        </h1>
        <p classname="textIndex">
          La facturación automática está en preparación. Por ahora, si desea
          solicitar facturas electrónicas, envíe la siguiente información a la
          dirección de correo electrónico ‘contacto.mex@royalcanin.com’ con el
          título de correo electrónico de ‘Solicitar factura_tu nombre_ Fecha de
          aplicación’ (por ejemplo, Solicitar factura_Calvin_21072020).{' '}
        </p>
        <p>Información requerida para la facturación:</p>
        <ol>
          <li> Nombre, Razón o Denominación Social</li>
          <li>RFC</li>
          <li>
            Direccion fiscal (incluyendo Calle, Numero (#), Colonia,
            Delegacion/municipio, Estado, C.P.)
          </li>
          <li>
            Uso del Tipo de CFDI (seleccione entre las siguientes dos opciones)
            <ol>
              <li>G01 Adquision de Mercancia</li>
              <li>G03 Gastos Generales</li>
            </ol>
          </li>
          <li>
            Forma de pago (seleccione entre las siguientes dos opciones)
            <ol>
              <li> Contado (si se paga con OXXO)</li>
              <li>Tarjeta de crédito / debito</li>
            </ol>
          </li>
          <li>
            Número de pedido (consulte el correo electrónico de confirmación de
            su pedido)
          </li>
          <li>Valor total del pedido / valor de la factura</li>
          <li> Dirección de correo electrónico para recibir facturas</li>
        </ol>

        <p>
          Tenga en cuenta que, por lo general, el proceso de facturación
          demorará hasta 1 semana y la factura se enviará a la dirección que
          dejó en el correo electrónico de solicitud de factura. Por lo tanto,
          preste atención a su bandeja de entrada de correo electrónico a su
          debido tiempo.
        </p>

        <p>
          Ante cualquier inquietud, comuníquese con
          ‘contacto.mex@royalcanin.com’. Gracias.
        </p>
      </div>
      <Footer />
    </div>
  );
}
