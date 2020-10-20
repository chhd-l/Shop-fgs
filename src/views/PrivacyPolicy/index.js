import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const localItemRoyal = window.__.localItemRoyal;

class PrivacyPolicy extends React.Component {
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
  }
  render() {
    return (
      <div>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg rc-padding-x--md--mobile">
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-padding-left--none">
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc-padding-left--none">
                      <h1>Política de privacidad</h1>
                      <h2>¿A qué aplica esta declaración de privacidad?</h2>
                    </div>
                  </div>
                </div>
                <p>
                  Esta declaración de privacidad aplica a su información
                  personal recogida o procesada a través de los sitios web,
                  aplicaciones móviles y otros servicios y productos que recogen
                  o procesan datos y exhiben esta declaración, que pertenece a
                  Mars, Incorporated y su familia de empresas. Esta declaración
                  no aplica a los sitios web, aplicaciones móviles y otros
                  servicios y productos de aquellas entidades que no exhiban ni
                  incluyan un enlace a esta declaración de privacidad o que
                  tengan su propia declaración de privacidad. Esta declaración
                  de privacidad se aplica a su información personal, que es
                  cualquier información o combinación de información que podría
                  utilizarse razonablemente para identificarlo.
                </p>
                <p>
                  Adaptamos nuestras prácticas de privacidad a las leyes de
                  protección de datos del país y cooperamos con las autoridades
                  de protección de datos del país si creen que ha ocurrido un
                  problema de privacidad.
                </p>
                <p>
                  Si se encuentra en la Unión Europea, la subsidiaria o filial
                  de Mars que posee y opera el sitio web que usted visita, será
                  el controlador de datos responsable de recoger y utilizar su
                  información personal. Si tiene alguna consulta sobre cómo se
                  utiliza su información personal, puede comunicarse con el
                  controlador de datos a través del Encargado de Privacidad
                  Global, cuyos datos de contacto aparecen a continuación.
                </p>
                <h3>¿Qué información recogemos y procesamos?</h3>
                <p>
                  Podemos recoger o procesar información diversa que usted nos
                  brinda, que incluye datos personales de contacto e información
                  relacionada con sus compras, empleo o demografía.
                </p>
                <ul>
                  <li className="rc-list__item">
                    Los datos personales de contacto incluyen información tal
                    como nombres, domicilios, números de teléfono o direcciones
                    de correo electrónico como los que nos brinda durante una
                    inscripción en línea o cuando hace transacciones con
                    nosotros o nos provee servicios; algunos sitios web permiten
                    establecer un número de usuario y una contraseña para
                    configurar una cuenta.
                  </li>
                  <li className="rc-list__item">
                    La información relacionada con compras incluye datos sobre
                    compras que hace en nuestros sitios web, que incluyen
                    información sobre tarjetas de pago y datos de envío.
                  </li>
                  <li className="rc-list__item">
                    La información relacionada con el empleo incluye sus
                    preferencias de empleo indicadas, antecedentes laborales e
                    información provista en solicitudes enviadas en línea.
                  </li>
                  <li className="rc-list__item">
                    La información demográfica incluye datos tales como edad,
                    sexo, información sobre pasatiempos o actividades,
                    predilecciones u otra información sobre preferencias y
                    similares.
                  </li>
                </ul>
                <p>
                  Podemos recoger información de otras fuentes, que incluyen
                  listas de contactos, e información demográfica de terceros y
                  otras fuentes. Estos datos pueden combinarse con otra
                  información que recojamos o utilicemos para los fines
                  descritos en esta declaración de privacidad.
                </p>
                <p>
                  También recogemos ciertos tipos de información
                  automáticamente:
                </p>
                <ul>
                  <li className="rc-list__item">
                    Su dirección de Protocolo de Internet (IP) o identificador
                    de dispositivos, el sistema operativo de su dispositivo,
                    tipo de explorador, sitios web visitados antes o después de
                    su visita a nuestro sitio web, páginas vistas y actividades
                    en nuestro sitio web, así como su interacción con los
                    anuncios.
                  </li>
                  <li className="rc-list__item">
                    Los terceros socios de servicios y de publicidad también
                    pueden recoger información automáticamente.
                  </li>
                  <li className="rc-list__item">
                    Obtenga más información sobre nuestras prácticas de
                    recolección de datos&nbsp;
                    <a href="https://www.mars.com/global/policies/privacy/pp-english#cookies">
                      a continuación
                    </a>
                    .
                  </li>
                </ul>

                <p>
                  Esta información se recoge directamente de usted, así como a
                  través de terceros que usted haya autorizado para brindar tal
                  información personal, y cuando lo permita la ley local, a
                  través de fuentes disponibles públicamente, como redes
                  sociales.
                </p>
                <p>¿Por qué recogemos y cómo utilizamos su información?</p>
                <p>
                  Podemos utilizar su información para varios fines, que
                  incluyen: proveer productos o servicios que solicite;
                  administrar promociones (sorteos, concursos y ofertas);
                  comunicarnos con usted; ofrecer publicidad, mejorar nuestros
                  sitios web, productos y servicios; y para otros fines
                  comerciales legítimos, como se explica a continuación:
                </p>
                <ul>
                  <li className="rc-list__item">
                    Brindar las prestaciones, productos y servicios que
                    solicite: podemos utilizar la información que recogemos
                    sobre usted para cumplir con sus solicitudes y permitir el
                    uso de nuestras prestaciones, productos y servicios.
                  </li>
                  <li className="rc-list__item">
                    Inscripción, concursos y promociones: podemos utilizar su
                    información para hacerlo ingresar en concursos, notificarle
                    los resultados e inscribirlo en ciertas prestaciones,
                    productos y servicios en línea con sus preferencias de
                    mercadotecnia elegidas.
                  </li>
                  <li className="rc-list__item">
                    Para comunicarnos con usted y brindarle información: podemos
                    utilizar su información para comunicarnos con usted, para
                    responder sus preguntas o comentarios, para brindarle
                    actualizaciones y novedades y para avisarle cuando surjan
                    vacantes de empleo que coincidan con su perfil (en el caso
                    de que envíe su currículum vitae). También podemos utilizar
                    su información para brindarle contenido e información
                    personalizados, y para enviarle folletos, cupones, muestras,
                    ofertas y otra información sobre nuestros productos o
                    nuestra familia de empresas. Solicitamos a los visitantes
                    que brindan sus direcciones de correo electrónico que
                    indiquen si les gustaría obtener más información o
                    actualizaciones de nuestra parte o de nuestro sitio web y
                    solo aquellos que lo solicitan recibirán comunicaciones de
                    seguimiento de nuestra parte. También podemos preguntar si
                    le gustaría recibir información sobre otros productos
                    disponibles de miembros de nuestra familia de empresas.
                    También ofrecemos a los visitantes la opción de "cancelar",
                    en cualquier momento que lo deseen, la recepción de correos
                    electrónicos u otra información de nuestra parte.
                  </li>
                  <li className="rc-list__item">
                    Cuando cumplimos con nuestras obligaciones en virtud de un
                    contrato con usted: podemos utilizar su información cuando
                    trabaja para nosotros como empleado o proveedor de servicios
                    o se postula para un empleo en nuestra empresa, según sea
                    necesario, en relación con su contrato de empleo o contrato
                    de servicios. Si es cliente o usuario de nuestros servicios,
                    utilizaremos su información personal para cumplir con
                    nuestras obligaciones en virtud del contrato que tengamos
                    con usted.
                  </li>
                  <li className="rc-list__item">
                    Para ofrecer publicidad pertinente: podemos comprar y
                    utilizar listas de correo electrónico para comunicarnos con
                    clientes potenciales que creamos que puedan estar
                    interesados en productos y servicios de la familia de
                    empresas de Mars. Respetaremos sus solicitudes de cancelar
                    estas opciones y pedir a quienes nos brindan las listas que
                    nos aseguren que la información de contacto de correo
                    electrónico se brinde únicamente para aquellos clientes que
                    hayan expresado un deseo de recibir ofertas e información
                    por correo electrónico. También podemos utilizar información
                    demográfica y de preferencias para permitir hacer publicidad
                    relacionada con los productos y servicios de Mars que se
                    enviará a usuarios para quienes son más pertinentes. Esto
                    está diseñado para que los usuarios vean publicidades que es
                    más probable que les interesen, y los publicistas pueden
                    exhibir sus anuncios a personas que es más probable que sean
                    receptivas. Para obtener más información sobre nuestras
                    prácticas de publicidad, consulte&nbsp;
                    <a href="https://www.mars.com/global/policies/privacy/pp-english#internetad">
                      Cuál es nuestra política sobre publicidad en línea basada
                      en intereses
                    </a>
                    &nbsp;a continuación.
                  </li>
                  <li className="rc-list__item">
                    Brindarle otras ofertas: a veces, nuestras marcas pondrán a
                    su disposición por correo electrónico ofertas, cupones e
                    información, incluidos catálogos. Por ejemplo, cuando los
                    clientes hacen un pedido en línea en nuestras tiendas por
                    catálogo o se inscriben en uno de nuestros catálogos en
                    línea, es posible que los agreguemos a la lista para recibir
                    tal catálogo. También podemos utilizar listas que hayamos
                    recibido de terceros o fuentes públicas para enviarle esta
                    información, y, como se hace rutinariamente en el negocio de
                    los catálogos, podemos intercambiar nombres y domicilios
                    (pero no direcciones de correo electrónico que no tengan el
                    consentimiento) de nuestros clientes de catálogos con otras
                    empresas de catálogos, que también pueden comunicarse con
                    usted por correo electrónico. Puede "cancelar" recibir
                    comunicaciones fuera de línea de nuestras marcas en
                    cualquier momento.
                  </li>
                  <li className="rc-list__item">
                    Para mejorar nuestros sitios web, prestaciones, productos y
                    servicios: podemos utilizar la información que recogemos
                    para mejorar la familia de Mars de ofertas de productos,
                    servicios, así como nuestros sitios web y prestaciones.
                  </li>
                  <li className="rc-list__item">
                    Para ciertas actividades de tomas de decisiones
                    automatizadas: podemos utilizar la información que recogemos
                    para ofrecer publicidad en línea o para generar un perfil de
                    personalidad para usted. A continuación se explican los
                    datos de la información personal que recogemos, cómo se
                    utiliza, y cómo puede cancelar cualquier toma de decisiones
                    automatizada.
                  </li>
                </ul>
                <p>¿Cómo compartimos y divulgamos su información?</p>
                <p>Podemos compartir o divulgar su información:</p>
                <ul>
                  <li className="rc-list__item">
                    Con Mars y la familia de empresas de Mars;
                  </li>
                  <li className="rc-list__item">
                    Con proveedores o agentes. Por ejemplo, podemos compartir su
                    información con empresas que hayamos contratado para
                    suministrar servicios en nuestro nombre. Cuando compartimos
                    información con estas empresas para suministrarnos
                    servicios, no están autorizadas a utilizarla para ningún
                    otro fin y deben mantenerla en forma confidencial, salvo que
                    usted consienta a algo distinto.
                  </li>
                  <li className="rc-list__item">
                    Cuando su información pueda transferirse junto con otros
                    activos comerciales.
                  </li>
                </ul>
                <p>
                  También podemos compartir o divulgar información personal,
                  incluyendo el contenido de sus comunicaciones:
                </p>
                <ul>
                  <li className="rc-list__item">
                    Para cumplir con la ley o responder a un proceso legal o
                    solicitudes legítimas, que incluyen organismos de aplicación
                    de la ley y gubernamentales.
                  </li>
                  <li className="rc-list__item">
                    Para realizar investigaciones de quejas de clientes o
                    posibles incumplimientos de la ley, proteger la integridad
                    del sitio web, satisfacer sus pedidos o cooperar con
                    cualquier investigación legal.
                  </li>
                  <li className="rc-list__item">
                    Para proteger los derechos o propiedad de la familia de
                    empresas de Mars o nuestros clientes, que incluye aplicar
                    los términos que rigen su uso de los servicios.
                  </li>
                  <li className="rc-list__item">
                    Para actuar en buena fe de que el acceso o la divulgación es
                    necesario para proteger la seguridad de nuestros asociados,
                    clientes o el público.
                  </li>
                </ul>
                <p>
                  Tenga en cuenta que nuestros sitios web pueden incluir enlaces
                  a sitios web de terceros cuyas prácticas de privacidad pueden
                  diferir con las nuestras. Si envía información personal a
                  cualquiera de dichos sitios web, su información se rige por
                  las políticas de privacidad de tales sitios web. Lo alentamos
                  a revisar la declaración de privacidad de cualquier sitio web
                  que visite.
                </p>
                <p>¿Qué hay acerca de la privacidad de los niños?</p>
                <p>
                  Nuestros sitios web están principalmente diseñados y
                  destinados para adultos y adolescentes mayores de 13 años. En
                  virtud de la Ley de Protección de Privacidad en Línea de Niños
                  (COPPA), a sabiendas no recogemos ni almacenamos información
                  personal sobre menores de 13 años, y nuestros sitios web no
                  están diseñados para recoger información personal de menores
                  de 13 años. En cuanto a los adolescentes menores de 16 años,
                  obtendremos el consentimiento paterno antes de que sometan su
                  información personal a Mars por medio de sus páginas web,
                  publicar material, subir fotos o información. Implementaremos
                  medidas para verificar el consentimiento paterno, tomando en
                  consideración la tecnología disponible. Podemos solicitar a
                  los visitantes que ingresen una fecha de nacimiento para
                  restringir a aquellos que sean menores de edad para acceder
                  ciertos sitios web, áreas o prestaciones. Donde las leyes
                  locales imponen requisitos de edad más altos, cumpliremos con
                  esos requisitos. Para obtener más información, revise nuestra
                  Nota Especial Para Los Padres y Código de Mercadotecnia de
                  Mars.
                </p>
                <h3>
                  ¿Cuáles son nuestras políticas sobre la publicidad en línea
                  basada en intereses?
                </h3>
                <p>
                  Apoyamos los Principios Autorregulatorios para Publicidad
                  Conductual en Línea de la Alianza de Publicidad Digital en
                  Estados Unidos y para clientes de Estados Unidos. Se puede
                  encontrar más información sobre estos Principios&nbsp;
                  <a href="http://www.aboutads.info/obaprinciples">aquí</a>. Se
                  espera que los anuncios que colocamos en línea que utilizan
                  datos basados en intereses sean entregados con el Ícono de
                  Opción de Publicidad para ayudar a los consumidores a
                  comprender cómo se recogen y utilizan sus datos y para brindar
                  opciones a los consumidores que desean tener más control. El
                  Ícono es el siguiente:
                </p>
                <p>
                  <img
                    alt="logo"
                    src="https://www.mars.com/sites/g/files/jydpyr121/files/styles/thumbnail/public/advertising-option-icon_0.png?itok=r-ki3CVH"
                  />
                </p>
                <p>
                  Al hacer clic en el Ícono cuando aparece, puede revisar la
                  información (y seguir la información) sobre anuncios en línea
                  basados en intereses, que incluyen quién recoge y utiliza sus
                  datos en línea, cómo puede cancelar la recepción de tales
                  anuncios y más.
                </p>
                <h3>
                  ¿Cómo ofrecemos los anuncios a través de la publicidad en
                  línea basada en intereses?
                </h3>
                <p>
                  A veces, exhibimos anuncios tanto en nuestra red de sitios web
                  operados y propios como en los sitios web de terceros. Cuando
                  visita uno de nuestros sitios web o ve anuncios que ofrecemos
                  en otro lado en línea, es posible que vea diferentes tipos de
                  anuncios, tales como resultados de búsquedas o anuncios en
                  video en páginas web. A veces, estos anuncios se basan en el
                  contenido de las páginas en las que aparecen. Otras veces,
                  estos anuncios son generados al combinar el anuncio en
                  particular con sus intereses, según se infiera de sus
                  actividades en línea que se hayan recogido con el tiempo. Con
                  la publicidad basada en intereses, el objetivo es mostrarle
                  anuncios que sean más pertinentes para usted.
                </p>
                <p>
                  Para hacerlo, nosotros y algunas de nuestras empresas de
                  publicidad de terceros utilizan tecnologías tales como cookies
                  y etiquetas de píxeles para recoger información sobre su
                  interacción con nuestros sitios web y otros sitios web de
                  terceros (“Datos en línea”). Estos Datos en Línea, por lo
                  general, no lo identifican a usted personalmente y,
                  típicamente, se agrupan con otros datos para crear segmentos:
                  grupos de usuarios y ciertas categorías generales de intereses
                  que hayamos inferido sobre la base de varios factores (por
                  ejemplo, “fanático de los deportes”). Los Datos en Línea
                  pueden incluir:
                </p>
                <p>
                  • Las páginas web, productos y servicios que ve y los enlaces
                  en los que hace clic cuando utiliza nuestros sitios web y
                  servicios, así como los sitios web de terceros;
                </p>
                <p>
                  • Nuestros correos electrónicos que usted ve y los enlaces en
                  los que hace clic dentro de tal correo electrónico;
                </p>
                <p>• Si ve o hace clic en anuncios que le muestran;</p>
                <p>
                  • Datos demográficos o de interés, que incluyen la ubicación
                  geográfica general derivada de la dirección de IP; y
                </p>
                <p>
                  • Los términos de búsqueda que ingresa cuando utiliza
                  determinados servicios de búsqueda.
                </p>
                <p>
                  Nosotros y nuestros socios de publicidad utilizan estos Datos
                  en Línea para tener una imagen más clara del interés de los
                  públicos con los cuales interactuamos –incluido usted – para
                  que podamos ofrecer anuncios que sean más pertinentes para
                  esos intereses.
                </p>
                <p>
                  Además, nuestros socios de publicidad utilizan Datos en Línea
                  para varios otros propósitos, que incluyen (a) junto con
                  publicidad que aparece en nuestro sitio web u otros sitios
                  web, (b) para informar el tráfico, la estadística, los datos
                  de publicidad y otras interacciones de los anuncios y los
                  sitios web en los cuales se ofrecen, y (c) para medir la
                  efectividad de los anuncios basados en la web y en el correo
                  electrónico.
                </p>
                <h3>
                  ¿Por qué desearía recibir anuncios basados en intereses?
                </h3>
                <p>
                  A los consumidores les gusta recibir anuncios basados en
                  intereses por muchas razones diferentes. Los anuncios basados
                  en intereses son útiles porque están más diseñados de acuerdo
                  con sus intereses personales. Por ejemplo, los dueños de gatos
                  pueden ver más anuncios sobre comida para gatos y menos avisos
                  para servicios de peluquería para perros. También es más
                  probable que los anuncios basados en intereses lo ayuden a
                  descubrir productos y servicios nuevos que en realidad son
                  pertinentes para usted y sus intereses. Por ejemplo, los
                  dueños de perros pueden ver un anuncio sobre los últimos
                  productos de peluquería para perros, mientras que es más
                  probable que los dueños de gatos vean un anuncio sobre la
                  última solución para las bolas de pelo felino. En breve,
                  recibir anuncios basados en intereses puede ayudar a mejorar
                  su acceso a productos, servicios y prestaciones nuevos que son
                  más pertinentes para usted, que, a su vez, podrían ayudar a
                  mejorar su vida y experiencias sociales. Tampoco verá los
                  mismos anuncios una y otra vez de nuestra parte porque la
                  cantidad de veces que ve un anuncio basado en intereses en
                  particular es limitada. Al cancelar los anuncios basados en
                  intereses, pierde todos estos beneficios.
                </p>
                <p>
                  Una nota sobre Google Analytics: para ayudar a facilitar la
                  entrega de contenidos pertinentes, utilizamos Google Analytics
                  Advertising Features, sobre los cuales puede averiguar más y
                  cancelarlos desde&nbsp;
                  <a href="https://support.google.com/analytics/answer/2700409?hl=en">
                    aquí
                  </a>
                  &nbsp;.
                </p>
                <h3>
                  ¿Cómo puede cancelar el recibir anuncios basados en intereses
                  de nuestra parte?
                </h3>
                <p>
                  Si ya no está interesado en recibir anuncios basados en
                  intereses de alguno de nuestros sitios Estadounidenses, puede
                  cancelarlos comunicándose con nosotros con la información que
                  figura a continuación. Sin embargo, tenga en cuenta que
                  cancelarlos no significa que ya no verá anuncios nuestros en
                  línea. Simplemente significa que nuestros anuncios en línea
                  que ve no se basarán en sus intereses particulares.
                </p>
                <p>
                  Según dónde viva, es posible que pueda acceder un lugar
                  conveniente para indicar sus preferencias, que incluye la
                  opción de hacer una cancelación “universal” de anuncios
                  basados en intereses con entidades participantes:
                </p>
                <p>
                  En Estados Unidos, visite este sitio:&nbsp;
                  <a href="http://www.aboutads.info/choices/" target="_blank">
                    Ad Choices
                  </a>
                  .
                </p>
                <p>
                  En Canadá, visite este sitio:&nbsp;
                  <a href="http://youradchoices.ca/">Your Ad Choices</a>.
                </p>
                <p>
                  En la Unión Europea, visite este sitio:&nbsp;
                  <a href="http://www.youronlinechoices.eu/">
                    Your Online Choices
                  </a>
                  .
                </p>
                <p>&nbsp;</p>
                <p>
                  Cuando cancela el uso de estos métodos, se colocará una cookie
                  en su dispositivo, que indica que ha cancelado la publicidad
                  basada en intereses. Si elimina las cookies, deberá volver a
                  cancelarlo. Estos sitios web también brindan información
                  detallada sobre publicidad basada en intereses y consejos para
                  manejar su privacidad en línea.
                </p>
                <h3>Aviso de cookies</h3>
                <h3>¿Qué son la cookies y cómo las utilizamos?</h3>
                <p>
                  Las “cookies” son archivos de datos que un sitio web envía a
                  su computadora mientras usted ve el sitio. Estos archivos de
                  datos incluyen información que permite a nuestro sitio
                  recordar información importante que hará que su uso del sitio
                  sea más eficiente y útil para usted. Nuestros sitios utilizan
                  cookies para varios fines. Utilizamos tecnología de cookies y
                  direcciones de IP para obtener información de visitantes en
                  línea, y también para ofrecer a los visitantes registrados la
                  mejor experiencia en línea personalizada que sea posible.
                </p>
                <p>
                  Los visitantes a nuestros sitios web utilizan diferentes
                  exploradores web y diferentes computadoras. Para hacer que sus
                  visitas sean tan fáciles como sea posible con la tecnología
                  que usted utiliza, automáticamente llevamos un registro del
                  tipo de explorador (por ej., Internet Explorer) y sistema
                  operativo (por ej., Windows, Mac) utilizado por un visitante,
                  y el nombre de dominio del proveedor de servicio de Internet
                  del visitante. También llevamos un registro de la cantidad
                  total de visitantes a nuestro sitio, en conjunto, para
                  permitirnos actualizar y mejorar nuestros sitios. Estos datos
                  nos informan si más visitantes prefieren ciertas prestaciones
                  o áreas en lugar de otras, lo que nos ayuda a mantener nuestro
                  sitio actualizado e interesante para la mayoría de los
                  visitantes. También utilizamos cookies para ayudar a impedir
                  que los niños ingresen en ciertas áreas o prestaciones
                  destinadas únicamente a adultos o adolescentes.
                </p>
                <h3>
                  ¿Cómo utilizamos cookies para personalizar su experiencia en
                  nuestros sitios?
                </h3>
                <p>
                  La tecnología de cookies nos ayuda a ofrecer contenido
                  diseñado para los intereses de un visitante, y es más fácil
                  para nuestros visitantes pedir productos, ingresar y
                  participar en sorteos y concursos, y ofrecerles otras
                  funciones. Los sitios que ofrecen compra en línea utilizan
                  cookies para recordar y procesar los elementos del carrito de
                  compras. Cuando corresponda en virtud de nuestras prácticas y
                  políticas informadas, podemos asociar información personal con
                  un archivo de cookie en tales casos.
                </p>
                <h3>¿Los terceros utilizan cookies en nuestro sitio?</h3>
                <p>
                  Podemos permitir a terceros utilizar cookies y publicitar en
                  nuestros sitios web. No controlamos las cookies de terceros.
                  <a name="tab57" id="tab57"></a>&nbsp;Hay programas gratuitos
                  que puede descargar y que le permitirían configurar sus
                  preferencias y bloquear la mayoría de las cookies de terceros
                  en Internet.
                </p>
                <h3>Diferentes tipos de cookies que utilizamos</h3>
                <p>
                  Las cookies que utilizamos se basan en la guía para categorías
                  de cookies de la Cámara Internacional de Comercio:
                  estrictamente necesarias, de rendimiento, de funcionalidad y
                  objetivo.
                </p>
                <p>
                  Las&nbsp;<strong>cookies "estrictamente necesarias"</strong>
                  &nbsp;le permiten moverse por el sitio web y utilizar
                  funciones esenciales como áreas seguras, carros de compras y
                  facturación en línea. Estas cookies no reúnen información
                  sobre usted que podría utilizarse para fines de mercadotecnia
                  o para recordar dónde estuvo en Internet. Utilizamos estas
                  cookies estricatamente necesarias para
                </p>
                <ul>
                  <li className="rc-list__item">
                    Recordar cosas como información que ha ingresado en
                    formularios de pedido cuando navega por diferentes páginas
                    en una sola sesión del explorador web
                  </li>
                  <li className="rc-list__item">
                    Recordar las mercaderías y los servicios que pide cuando
                    llega a la página de pago
                  </li>
                  <li className="rc-list__item">
                    Identificarlo como haber iniciado una sesión en el sitio web
                    de Mars
                  </li>
                  <li className="rc-list__item">
                    Asegurarnos de que se conecte al servicio correcto en
                    nuestro sitio web cuando hacemos cambios en la manera en que
                    funciona el sitio web
                  </li>
                </ul>
                <p>
                  Las cookies que hemos definido como "estrictamente
                  necesarias"&nbsp;<strong>NO</strong>&nbsp;se utilizarán para
                </p>
                <ul>
                  <li className="rc-list__item">
                    Reunir información que podría utilizarse para publicitar
                    productos o servicios para usted
                  </li>
                  <li className="rc-list__item">
                    Recordar sus preferencias o nombre de usuario después de su
                    visita actual
                  </li>
                </ul>
                <p>
                  Las&nbsp;<strong>cookies de "rendimiento"&nbsp;</strong>
                  recogen información sobre cómo utiliza nuestro sitio web, por
                  ej., qué páginas visita, y si recibe errores. Estas cookies no
                  recogen información que podría identificarlo: toda la
                  información recogida es anónima y solo se utiliza para
                  ayudarnos a mejorar cómo funciona el sitio web, comprender qué
                  interesa a los usuarios y medir qué tan efectiva es la
                  publicidad. Utilizamos cookies de rendimiento para
                </p>
                <ul>
                  <li className="rc-list__item">
                    Producir estadísticas sobre cómo se utiliza el sitio web
                  </li>
                  <li className="rc-list__item">
                    Ver qué tan efectivos son los anuncios (no utilizamos esta
                    información para dirigir anuncios a usted cuando visita
                    otros sitios web)
                  </li>
                  <li className="rc-list__item">
                    Ayudarnos a mejorar el sitio web al medir los errores que se
                    produzcan
                  </li>
                  <li className="rc-list__item">
                    Probar diferentes diseños del sitio web
                  </li>
                </ul>
                <p>
                  Las cookies que hemos definido como de "rendimiento"&nbsp;
                  <strong>NO</strong>&nbsp;se utilizarán para
                </p>
                <ul>
                  <li className="rc-list__item">
                    Reunir información que podría utilizarse para publicitar
                    productos o servicios para usted en otros sitios web
                  </li>
                  <li className="rc-list__item">
                    Recordar sus preferencias o nombre de usuario después de su
                    visita actual
                  </li>
                  <li className="rc-list__item">
                    Destinar anuncios a usted en cualquier otro sitio web
                  </li>
                </ul>
                <p>
                  Las&nbsp;<strong>cookies de "funcionalidad"&nbsp;</strong>se
                  utilizan para prestar servicios o para recordar
                  configuraciones para mejorar su visita. Utilizamos cookies de
                  "funcionalidad" para
                </p>
                <ul>
                  <li className="rc-list__item">
                    Recordar configuraciones que haya aplicado, tales como
                    diseño, tamaño de texto, preferencias y colores
                  </li>
                  <li className="rc-list__item">
                    Recordar si ya le preguntamos si desea completar una
                    encuesta
                  </li>
                  <li className="rc-list__item">
                    Mostrarle cuando inició una sesión en el sitio
                  </li>
                  <li className="rc-list__item">
                    Compartir información con socios para prestar un servicio en
                    el sitio. La información compartida solo se utilizará para
                    suministrar el servicio, producto o función y para ningún
                    otro fin
                  </li>
                </ul>
                <p>
                  Las cookies definidas como de "funcionalidad"&nbsp;
                  <strong>NO</strong>&nbsp;se utilizarán para
                </p>
                <ul>
                  <li className="rc-list__item">
                    Dirigir anuncios en otros sitios web
                  </li>
                </ul>
                <p>
                  Las&nbsp;<strong>cookies "objetivo"&nbsp;</strong>están
                  vinculadas a servicios provistos por terceros, tales como
                  botones "Me gusta" y "Compartir". El tercero suministra estos
                  servicios a cambio de reconocer que usted ha visitado nuestro
                  sitio web. Utilizamos cookies "objetivo" para
                </p>
                <ul>
                  <li className="rc-list__item">
                    Vincular a redes sociales como Facebook, que posteriormente
                    pueden utilizar información sobre usted para dirigir
                    publicidad a usted en otros sitios web
                  </li>
                  <li className="rc-list__item">
                    Brindar a agencias de publicidad información sobre su visita
                    para que puedan presentarle anuncios que podrían interesarle
                  </li>
                </ul>
                <h3>
                  ¿Qué son las etiquetas de píxeles y cómo las utilizamos?
                </h3>
                <p>
                  Algunas de las actualizaciones de nuestras páginas web y
                  correo electrónico pueden contener imágenes electrónicas
                  denominadas etiquetas de píxeles, a veces conocidas como GIF
                  de un píxel, GIF transparentes o directamente etiquetas de
                  píxeles. En los sitios, estas nos permiten contar los
                  visitantes que vieron nuestras páginas. En mensajes de correo
                  electrónico o boletines promocionales, nos permiten contar
                  cuántos suscriptores los leyeron. Las etiquetas de píxeles nos
                  permiten desarrollar estadísticas sobre las actividades y
                  funciones que más interesan a los consumidores a los fines de
                  brindar contenidos más personalizados. No se utilizan para
                  acceder a su información personal sin su consentimiento.
                </p>
                <h3>¿Cómo puede cancelar las cookies?</h3>
                <p>Configurar el explorador para rechazar cookies</p>
                <p>
                  Si no desea cookies, puede configurar su computadora para que
                  le advierta cada vez que se envía una cookie o para
                  deshabilitar todas las cookies del explorador (por ej.,
                  Internet Explorer o Firefox). Revise el menú AYUDA del
                  explorador para conocer la forma correcta de cambiar o
                  actualizar las cookies.
                </p>
                <p>
                  En su lugar, puede visitar www.aboutcookies.org , que contiene
                  información exhaustiva sobre cómo hacerlo en una amplia gama
                  de exploradores. También encontrará datos sobre cómo eliminar
                  cookies de la computadora, así como más información general
                  sobre las cookies. Para obtener información sobre cómo hacerlo
                  en el explorador del teléfono móvil, deberá consultar el
                  manual del dispositivo portátil.
                </p>
                <p>
                  Tenga en cuenta que restringir las cookies puede afectar la
                  funcionalidad de los sitios web de Mars.
                </p>
                <h3>¿Qué más debe saber?</h3>
                <p>¿Dónde se almacena y procesa su información?</p>
                <p>
                  La información personal recogida en nuestros sitios web y
                  servicios, o recibida por Mars de usted o de terceros, puede
                  almacenarse y procesarse en Estados Unidos o en cualquier otro
                  país donde nosotros o nuestros proveedores de servicios
                  tengamos o tengan instalaciones.
                </p>
                <p>
                  Los servidores y bases de datos en los que se puede almacenar
                  información pueden ubicarse fuera del país desde el cual usted
                  accedió a este sitio web y en un país que no tenga las mismas
                  leyes de privacidad que su país de residencia. La información
                  personal que nos brinda puede transferirse al exterior, pero
                  recogeremos, procesaremos y utilizaremos información personal
                  únicamente de conformidad con esta declaración de privacidad.
                </p>
                <p>
                  Las averiguaciones relacionadas con el trabajo también pueden
                  transferirse a un miembro de la familia de empresas de Mars.
                  Al visitar este sitio web y enviar información, presta su
                  consentimiento a tal recolección, procesamiento, transferencia
                  o almacenamiento de su información personal. Tenga en cuenta:
                  nuestras políticas pueden variar por región, así que si visita
                  uno de nuestros sitios web en una región diferente, verifique
                  para ver si hay una declaración específica para ese lugar.
                </p>
                <p>¿Durante cuánto tiempo almacenamos su información?</p>
                <p>
                  Conservamos y almacenamos su información personal solo durante
                  el tiempo que tengamos un propósito comercial legítimo para
                  hacerlo y de conformidad con nuestras políticas de
                  conservación de datos.
                </p>
                <p>
                  ¿Qué hay acerca de la información personal que está disponible
                  públicamente (como en salas de chat, tableros de mensajes u
                  otros foros interactivos)?
                </p>
                <p>
                  Podemos ofrecer salas de chat, tableros de mensajes o
                  boletines o áreas interactivas donde los visitantes pueden
                  publicar comentarios o información para que disfruten los
                  visitantes. Si hay una sala de chat, tablero de boletines o
                  mensajes, oportunidades de utilizar redes sociales u otras
                  áreas interactivas donde se puede publicar información
                  personal en este sitio web, asegúrese de verificar las reglas
                  publicadas antes de ingresar, ya que estará sujeto a ellas,
                  así como a nuestros Términos y condiciones generales. Las
                  reglas para la participación en prestaciones interactivas
                  pueden establecer restricciones de edad y de otro tipo para la
                  participación. Todo lo que publica en línea es información
                  pública, y no somos responsables de nada que publique
                  voluntariamente en línea. Los usuarios deberán tener cuidado
                  cuando divulguen información personal en línea.
                </p>
                <h3>Cesión</h3>
                <p>
                  En el caso de que parte o la totalidad de nuestros activos
                  sean vendidos o adquiridos por otra parte, o en el caso de una
                  fusión corporativa, nos otorga el derecho de ceder la
                  información personal que recogimos sobre usted.
                </p>
                <p>¿Cómo salvaguardamos su información?</p>
                <p>
                  Hemos implementado salvaguardas administrativas, físicas y
                  técnicas diseñadas para proteger su información. Sin embargo,
                  ninguna medida de seguridad puede ser 100% segura, de modo que
                  recomendamos que tome medidas adicionales para protegerse a
                  usted mismo y su información, que incluye instalar software de
                  antivirus actualizado, cerrar exploradores después de usarlos,
                  mantener confidenciales sus credenciales y contraseñas para
                  iniciar una sesión, y asegurarse de actualizar regularmente el
                  software y las aplicaciones que ha descargado, para garantizar
                  que tiene habilitadas las últimas funciones de seguridad en
                  sus dispositivos.
                </p>
                <h3>Transferencia internacional de información</h3>
                <p>
                  Si decide brindarnos información personal, podemos transferir
                  tal información a nuestras filiales y subsidiarias o a otros
                  terceros, transfronterizos, y desde su país o jurisdicción a
                  otros países o jurisdicciones de todo el mundo, de conformidad
                  con los requerimientos legales.Mars principalmente utiliza las
                  Cláusulas Contractuales Estándar de la Comisión de la Unión
                  Europea para transferencias de datos de la Unión Europea a
                  países fuera del Área Económica Europea. Mars también utiliza
                  el marco de Protección de la Privacidad UE-EE. UU. para
                  transferencias de datos entre la UE y EE. UU.
                </p>
                <p>Nuestro compromiso con la protección de la privacidad</p>
                <p>
                  Mars EE. UU. y sus subsidiarias controladas de EE. UU. (
                  <a href="https://www.mars.com/global/about-us/policies-and-practices/mars-us-entities-covered-under-privacy-shield-application">
                    vea lista de entidades de Mars E.E.U. y filiales aquí
                  </a>
                  ) participan en el Marco de Protección de la Privacidad UE-EE.
                  UU. y el Marco de Referencia de Escudo de Privacidad
                  Suizo-E.E.U.U., y han certificado al Departamento de Comercio
                  que están comprometidas con los Principios de Protección de la
                  Privacidad para procesar toda la información personal
                  transferida desde la Unión Europea y Suiza a Estados Unidos.
                  Mars sigue siendo responsable en virtud de los Principios de
                  Protección de la Privacidad si terceros agentes que contrata
                  para procesar los datos personales en su nombre lo hacen de
                  una manera que no coincide con los Principios, salvo que Mars
                  demuestre que no es responsable del acontecimiento que origina
                  el daño. En ciertas situaciones, las autoridades públicas le
                  pueden exigir a Mars que divulgue datos personales en
                  respuesta a solicitudes legítimas, incluyendo cumplir con
                  requerimientos de la seguridad nacional o de aplicación de la
                  ley. Alentamos a personas de la Unión Europea y Suiza a
                  comunicarse con nosotros por medio de&nbsp;
                  <a href="mailto:privacy@effem.com">privacy@effem.com</a>
                  &nbsp;si tuviera una queja o pregunta relacionada con la
                  Protección de la Privacidad, pero por cualquier queja que no
                  se resuelva con nosotros directamente, hemos decidido cooperar
                  con el panel establecido por las Autoridades Europeas de
                  Protección de Datos (DPA) y el Comisario Federal de Protección
                  de Datos y Información de Suiza (FDPIC). En ciertas
                  circunstancias, la Protección de Datos ofrece a las personas
                  afectadas el derecho de invocar el arbitraje vinculante para
                  resolver quejas que no se resuelven por otros medios. Mars EE.
                  UU. está sujeto a las facultades de investigación y aplicación
                  de la Comisión Federal de Comercio (FTC) de EE. UU. Si existe
                  algún conflicto entre los términos de esta Declaración de
                  Privacidad y Principios de Escudo de Privacidad, los
                  Principios de Escudo de Privacidad gobernarán. Para conocer
                  más sobre el programa de Protección de la Privacidad y ver
                  nuestra certificación, visite www.privacyshield.gov.
                </p>
                <p>Cambios a esta declaración de privacidad</p>
                <p>
                  Podemos actualizar esta declaración de privacidad,
                  ocasionalmente, de modo que visite esta página periódicamente
                  para revisar su declaración en busca de cambios. Le avisaremos
                  sobre cambios sustanciales a esta declaración de privacidad
                  publicando un aviso en nuestra página de inicio durante un
                  período razonable y cambiando la fecha de "Última
                  actualización" [(a continuación)]. Su uso continuo de nuestros
                  sitios web tras la publicación de cambios significará que
                  acepta los términos modificados.
                </p>
                <p>
                  ¿Qué debería hacer si tiene preguntas, desea acceder,
                  actualizar o eliminar información o desea cancelar el recibir
                  comunicaciones futuras?&nbsp;Tomamos medidas para mantener la
                  precisión de su información personal. Puede ver, corregir o
                  actualizar la información personal de contacto para brindar a
                  Mars. Algunos programas de Mars ofrecen acceso para ver o
                  actualizar la información personal en línea. Verifique dónde
                  se registró para saber si puede ver o actualizar su
                  información allí.
                </p>
                <p>
                  Si desea acceder, actualizar, cambiar, eliminar, transferir,
                  restringir u objetar el procesamiento de la información que
                  tenemos sobre usted en nuestra base de datos de mercadotecnia
                  (sujeta a cualquier excepción legal aplicable), cancelar la
                  recepción de futuras comunicaciones de nuestra parte o si
                  tiene preguntas sobre nuestra declaración de privacidad,&nbsp;
                  <a href="mailto:privacy@effem.com">haga clic aquí</a>.
                </p>
                <p>
                  Cuando nuestro procesamiento de su información se base en su
                  consentimiento, puede tener derecho a retirar su
                  consentimiento comunicándose por correo electrónico con
                  nosotros en&nbsp;
                  <a href="mailto:privacy@effem.com">privacy@effem.com</a>.
                  Tenga en cuenta que retirar su consentimiento no afectará la
                  legalidad de nuestro procesamiento de su información basada en
                  su consentimiento antes de retirarlo. Cuando corresponda,
                  también puede tener derecho a presentar una queja en su
                  autoridad local de protección de datos. Estamos decididos a
                  resolver cualquier problema relacionado con nuestro manejo de
                  su información, y puede comunicarse con nosotros en cualquier
                  momento si tiene preguntas o dudas.
                </p>
                <h3>¿Cómo puede comunicarse con nosotros?</h3>
                <p>
                  Puede comunicarse con nosotros utilizando la siguiente
                  información:
                </p>
                <p>
                  Mars, Incorporated
                  <br />
                  Attn: Evie Kyriakides, Global Privacy Officer
                  <br />
                  Global Privacy Team
                  <br />
                  Dundee Road
                  <br />
                  Slough, Berkshire SL1 4LG
                  <br />
                  Correo electrónico:&nbsp;
                  <a href="mailto:privacy@effem.com">privacy@effem.com</a>
                </p>
                <p>
                  Estamos comprometidos con trabajar con usted para resolver
                  cualquier queja que pueda tener sobre esta Declaración de
                  privacidad o el tratamiento de su información personal. Si
                  tiene alguna duda, comuníquese con&nbsp;
                  <a href="mailto:privacy@effem.com">privacy@effem.com</a>
                  &nbsp;y su comunicación se tratará de inmediato.
                </p>
                <p>
                  <strong>
                    Procesamiento de información en la Unión Europea
                  </strong>
                </p>
                <p>
                  <strong>
                    Solo recogemos y utilizamos información personal procesada
                    en la Unión Europea cuando tenemos una base legítima para
                    hacerlo, según se describe a continuación:
                  </strong>
                </p>
                <ul>
                  <li className="rc-list__item">
                    Cuando el procesamiento de su información personal es en
                    nuestro beneficio legítimo: por ejemplo, podemos utilizar su
                    información personal para mejorar nuestros productos y
                    servicios y el contenido de nuestros sitios web, y con fines
                    administrativos, según se describe en esta declaración de
                    privacidad.
                  </li>
                  <li className="rc-list__item">
                    Cuando cumplimos con nuestras obligaciones en virtud de un
                    contrato con usted: por ejemplo, cuando trabaja para
                    nosotros como empleado o proveedor de servicios o se postula
                    para un empleo en nuestra empresa, deberemos procesar su
                    información personal en relación con su contrato de empleo o
                    acuerdo de servicios. Si es cliente, utilizaremos su
                    información personal para cumplir con nuestras obligaciones
                    en virtud del contrato que tengamos con usted.
                  </li>
                  <li className="rc-list__item">
                    Cuando tengamos una obligación legal de hacerlo: por
                    ejemplo, para cumplir con la ley o responder a un proceso
                    legal o solicitudes legítimas, que incluyen aquellos hechos
                    por organismos gubernamentales y de aplicación de la ley.
                  </li>
                </ul>
                <p>
                  Consentimiento: confiamos en que preste su consentimiento para
                  utilizar su información personal para fines de mercadotecnia,
                  en virtud de la ley aplicable.
                </p>
                <h3>¿Cuáles son sus derechos de privacidad en California?</h3>
                <p>
                  La ley de California permite a los residentes de California
                  cancelar la divulgación de Mars de información personal a
                  terceros para sus fines de mercadotecnia directa. Puede
                  decidir cancelar que compartamos su información personal con
                  terceros para fines de mercadotecnia, en cualquier momento,
                  enviando una solicitud por escrito a nuestro domicilio de
                  contacto más arriba o por correo electrónico a&nbsp;
                  <a href="mailto:privacy@effem.com">privacy@effem.com</a>.
                  Tenga en cuenta que esta cancelación no prohíbe la divulgación
                  hecha para fines que no sean de mercadotecnia. La ley de
                  California también permite a los residentes de California
                  solicitar y obtener de nuestra parte, una vez por año, sin
                  cargo, una lista de terceros (si los hubiera) a quienes
                  hayamos divulgado información personal para sus fines de
                  mercadotecnia directa en el año calendario anterior, así como
                  el tipo de información personal divulgada a tales terceros. Si
                  es residente de California y deseara solicitar esta
                  información, envíe su solicitud por correo electrónico
                  a:&nbsp;
                  <a href="mailto:privacy@effem.com">privacy@effem.com</a>
                  &nbsp;o por escrito a nuestro domicilio de contacto más
                  arriba. No se aceptarán solicitudes por teléfono o fax. El
                  asunto del correo electrónico o del sobre de la
                  correspondencia y el contenido de su solicitud deberá incluir
                  la frase “Your California Privacy Rights” (Sus derechos de
                  privacidad de California), e incluir su nombre, dirección de
                  correo electrónico (si desea recibir una respuesta por correo
                  electrónico) o domicilio, ciudad, estado, código postal (si
                  desea recibir una respuesta por correo postal).
                </p>
                <p>Cómo respondemos a divulgaciones del tipo "no rastrear"</p>
                <p>
                  No apoyamos las configuraciones del explorador de "no
                  rastrear" y actualmente no participamos en ningún marco "no
                  rastrear" que nos permitiría responder a señales u otros
                  mecanismos de parte suya con respecto a la recolección de su
                  información personal.
                </p>
                <p>Actualizado: julio de 2017</p>
                <p>
                  <strong>
                    Si hubiera algún conflicto entre la versión en inglés de
                    nuestra Declaración de privacidad y una versión traducida a
                    otro idioma, prevalecerá la versión en inglés.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default PrivacyPolicy;
