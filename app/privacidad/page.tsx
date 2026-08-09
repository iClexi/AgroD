import type { Metadata } from 'next'
import { LegalShell } from '@/components/legal/legal-shell'
import styles from '@/components/legal/legal.module.css'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Conoce qué datos utiliza AgroD, para qué los necesita y qué controles tienes sobre tu información.',
  alternates: { canonical: '/privacidad' },
}

const sections = [
  { id: 'alcance', label: 'Alcance' },
  { id: 'datos', label: 'Datos que tratamos' },
  { id: 'uso', label: 'Cómo usamos los datos' },
  { id: 'cookies', label: 'Cookies y almacenamiento local' },
  { id: 'compartir', label: 'Cuándo compartimos información' },
  { id: 'conservacion', label: 'Conservación y seguridad' },
  { id: 'derechos', label: 'Tus opciones y derechos' },
  { id: 'cambios', label: 'Cambios y contacto' },
] as const

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Privacidad en AgroD"
      title="Tu información, explicada con claridad"
      summary="Esta política describe la información que AgroD necesita para operar la cuenta, organizar la finca y mostrar las lecturas de los dispositivos. También explica lo que no hacemos con tus datos."
      sections={sections}
    >
      <section id="alcance">
        <h2>1. Alcance</h2>
        <p>Esta política se aplica al sitio web, el panel de AgroD y las funciones relacionadas con cultivos, fincas y dispositivos. AgroD se encuentra en una etapa de prototipo funcional y desarrollo educativo en la República Dominicana.</p>
        <p>Al crear una cuenta o usar la plataforma, se tratará la información necesaria para prestar esas funciones. No pedimos datos que no tengan una finalidad relacionada con el servicio.</p>
      </section>

      <section id="datos">
        <h2>2. Datos que tratamos</h2>
        <h3>Cuenta y perfil</h3>
        <ul>
          <li>Nombre, apellido, correo electrónico y fecha de nacimiento.</li>
          <li>Preferencias del perfil y productos de AgroD asociados a la cuenta.</li>
          <li>Datos de acceso y seguridad necesarios para autenticar la sesión.</li>
          <li>Fecha y versión de los términos y del aviso legal que aceptaste al crear la cuenta.</li>
        </ul>
        <h3>Finca, cultivos y dispositivos</h3>
        <ul>
          <li>Fincas, terrenos, cultivos o plantas que agregues a la plataforma.</li>
          <li>Ubicaciones que marques dentro del mapa de tu finca y las relaciones que crees entre plantas y dispositivos.</li>
          <li>Identificador, modelo, estado y actividad de cada dispositivo AgroD.</li>
          <li>Lecturas recibidas de los sensores, como humedad del suelo, temperatura y otros valores compatibles, además de alertas e historial operativo.</li>
        </ul>
        <h3>Información técnica</h3>
        <p>El servicio y su infraestructura de entrega pueden registrar información técnica básica, como el tipo de navegador, dirección IP, fecha de acceso, tiempos de carga y eventos de error, cuando sea necesaria para mantener la seguridad, medir el rendimiento técnico, diagnosticar fallas y proteger la cuenta. Esta telemetría operativa no se utiliza para crear perfiles publicitarios.</p>
      </section>

      <section id="uso">
        <h2>3. Cómo usamos los datos</h2>
        <p>Usamos esta información para:</p>
        <ul>
          <li>Crear y proteger tu cuenta, mantener la sesión y guardar los cambios de tu perfil.</li>
          <li>Mostrar el estado de cultivos y dispositivos, generar alertas y organizar recorridos o prioridades de atención.</li>
          <li>Relacionar plantas, terrenos y sensores según la configuración que tú decidas.</li>
          <li>Diagnosticar problemas, mejorar la experiencia y mantener el servicio estable.</li>
          <li>Prevenir usos indebidos y cumplir obligaciones aplicables.</li>
        </ul>
        <div className={styles.note}>
          <p><strong>No vendemos tus datos personales.</strong> Tampoco utilizamos tu información para publicidad dirigida.</p>
        </div>
      </section>

      <section id="cookies">
        <h2>4. Cookies y almacenamiento local</h2>
        <p>AgroD usa una cookie estrictamente necesaria para mantener la sesión iniciada y ayudar a proteger la cuenta. Sin ella, el acceso al panel no puede funcionar correctamente.</p>
        <p>También guardamos en tu navegador la opción que elijas en el aviso de cookies. Si permites preferencias, AgroD puede recordar la última vista que abriste en la demostración. Estos datos locales no contienen tus lecturas agrícolas ni se utilizan para seguirte en otros sitios.</p>
        <p>Actualmente no usamos cookies de publicidad ni medición comercial. La infraestructura de alojamiento puede procesar telemetría técnica de carga y seguridad como parte de la operación del sitio. Si incorporamos una tecnología opcional distinta, actualizaremos esta explicación y solicitaremos el permiso correspondiente antes de activarla.</p>
      </section>

      <section id="compartir">
        <h2>5. Cuándo compartimos información</h2>
        <p>No compartimos información personal para que terceros la comercialicen. El acceso puede limitarse a proveedores técnicos que sean necesarios para alojar, asegurar o mantener AgroD, únicamente para prestar esas funciones y bajo medidas de acceso restringido.</p>
        <p>También podríamos conservar o entregar información si una autoridad competente lo exige conforme a la legislación aplicable, o cuando sea necesario para investigar un riesgo de seguridad o proteger a una persona.</p>
      </section>

      <section id="conservacion">
        <h2>6. Conservación y seguridad</h2>
        <p>Conservamos los datos mientras la cuenta esté activa o sean necesarios para prestar el servicio. Algunos registros técnicos pueden mantenerse durante un plazo adicional razonable para seguridad, recuperación ante fallas o cumplimiento de obligaciones.</p>
        <p>Aplicamos medidas técnicas y organizativas razonables para reducir el riesgo de acceso, pérdida o alteración no autorizada. Ningún sistema conectado a internet puede prometer seguridad absoluta, por lo que también debes proteger tu contraseña y cerrar sesión en dispositivos compartidos.</p>
      </section>

      <section id="derechos">
        <h2>7. Tus opciones y derechos</h2>
        <p>Puedes revisar y actualizar varios datos desde tu perfil. También puedes solicitar acceso, corrección o eliminación de la información asociada a tu cuenta, sujeto a los registros que debamos conservar por razones legítimas o legales.</p>
        <p>Para realizar una solicitud, utiliza las opciones disponibles dentro de tu perfil o el canal de contacto que el equipo AgroD te haya entregado durante el registro o la instalación. Podremos pedirte una verificación razonable para evitar que otra persona modifique tus datos.</p>
        <p>AgroD no está dirigido a menores que utilicen el servicio sin la participación y autorización de una persona responsable.</p>
      </section>

      <section id="cambios">
        <h2>8. Cambios y contacto</h2>
        <p>Podemos actualizar esta política cuando cambien las funciones de AgroD o los requisitos aplicables. Si el cambio afecta de forma importante el uso de la información, lo comunicaremos dentro del sitio o la cuenta antes de que sea efectivo.</p>
        <p>Para preguntas sobre esta política, utiliza el canal de atención que el equipo AgroD entrega durante el registro o la instalación del servicio.</p>
      </section>
    </LegalShell>
  )
}
