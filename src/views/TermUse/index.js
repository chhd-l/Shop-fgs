import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

class TermUse extends React.Component {
  render (h) {
    return (
      <div>
        <Header showMiniIcons={true} location={this.props.location} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3"  >
          <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg rc-padding-x--md--mobile">
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-padding-left--none">
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h2 className="text-center">
                        Acuerdo de participación
                      </h2>
                    </div>
                  </div>
                </div>
                <p>
                  Para poder formalizar tu participación en esta etapa de pre lanzamiento de la plataforma, te pedimos confirmar mediante firma tu comprensión y aceptación de los términos y condiciones que aquí se tratan.
                </p>
                <p>
                  TÉRMINOS Y CONDICIONES GENERALES<br />
                  1.- INTEGRIDAD DEL CONVENIO<br />
                  La aceptación por parte del CLIENTE se condiciona expresamente al acuerdo y aceptación de los términos y condiciones contenidos en el presente documento, junto con cualquiera de los términos especiales estipulados por el Royal Canin Mexico SA de CV. Estos constituyen el acuerdo final y completo entre las partes el cual no podrá variarse excepto mediante modificación expresa  por escrito debidamente autorizada y firmada por las partes.
                </p>
                <p>
                  2.- APROBACION CREDITICIA, INFORMACION Y ACEPTACIÓN.<br />
                  Todos los pedidos que incluyan retribución, están sujetos a la aprobación de la solvencia crediticia del cliente, en caso de presentar un retraso en el pago de sus facturas de acuerdo a sus condiciones particulares de crédito, estos serán retenidos y/o cancelados después de 30 (treinta) días.
                </p>
                <p>
                  3.- MOVIMIENTOS DEL PRECIO.<br />
                  Royal Canin se reserva el derecho de administrar los precios en la plataforma así como posibles promociones. Se notificará con al menos 5 días hábiles mediante correo electrónico y/o carta en impresa.
                </p>
                <p>
                  4.- TÉRMlNOS DE PAGO.<br />
                  Toda retribución es pagadera contra la entrega en firme de los pedidos generados en la plataforma, que serán registrados por la misma y compartidas al final de mes como corte mensual, estarán sujetas a revisión en los primeros 10 (diez) días hábiles posterior al cierre de mes y será generada la nota de crédito correspondiente descontando cualquier cancelación o devolución que proceda. El monto a otorgarse mientras este convenio está vigente es equivalente al 15% de las compras comprobables por parte de los clientes referidos vía código único sobre la base de compra efectuada antes de impuestos. Dicho pago se programa dentro de los 10 (diez) días calendario siguientes a la fecha de cierre de mes bajo condiciones normales, ver punto 2.
                </p>
                <p>
                  5.- IMPUESTOS Y GASTOS ADICIONALES POR CUENTA DEL COMPRADOR.<br />
                  Además del precio de compra, el Comprador no deberá pagar ningún otro costo siempre y cuando supere la cantidad mínima de compra para envío gratuito estipulada en la plataforma. Royal Canin no será responsable administrar o emitir ningún cobro fuera de la plataforma.
                </p>
                <p>
                  6.- EXCLUSIÓN DE GARANTIAS.<br />
                  No existen garantías más amplias que las contenidas en la descripción del presente documento, y Royal Canin México desconoce y excluye expresa y específicamente cualquier otra afirmación, caución o garantía, ya sean verbales o escritas, estatutarias, de derecho consuetudinario o contractuales, expresas o implícitas, tales como, pero sin limitarse a, cualquier garantía de comercialidad, idoneidad de uso, idoneidad para un propósito específico o calidad.
                </p>
                <p>
                  7.- CORRECCION O CAMBIOS AL CONVENIO<br />
                  Royal Canin tendrá el derecho de corregir cualquier error evidente dactilográfico o tipográfico contenido en el presente documento o en cualquiera de los documentos relacionados con la transacción de las partes. Cualquier cambio sobre los acuerdos que este convenio abarca serán realizados sin consulta y se notificarán con al menos 15 (quince) días naturales previo a su inicio de vigencia.
                </p>
                <p>
                  8.- LEY APLICABLE Y JURISDICCION.<br />
                  En caso de proceso judicial en relación con cualquier asunto materia del presente Contrato, las partes celebrantes acuerdan de manera irrevocable que dicho asunto sea juzgado o decidido por los tribunales competentes de la Ciudad de México; México. Así mismo, las partes celebrantes acuerdan irrevocablemente someterse de manera general e incondicional a la Jurisdicción de cualquiera de dichos tribunales en relación con dichos asuntos y renuncian expresamente a cualquier otra jurisdicción a la que tengan derecho en virtud de sus domicilios presentes o futuros o por cualquier otro motivo. La invalidez, ilegalidad o falta de coercibilidad de una o más de las disposiciones del presente Contrato de ninguna manera afectará la validez y coercibilidad de las demás estipulaciones del presente Contrato. En cualquier demanda, acción o procedimiento entre las partes relacionando con el presente contrato, la parte Vendedora tendrá derecho al reembolso de todos los honorarios, gastos y costes legales.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default TermUse