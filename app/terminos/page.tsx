import type { Metadata } from 'next'
import { LegalShell } from '@/components/legal/legal-shell'
import styles from '@/components/legal/legal.module.css'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Condiciones de uso de la cuenta, el panel y los dispositivos compatibles con AgroD.',
  alternates: { canonical: '/terminos' },
}

const sections = [
  { id: 'aceptacion', label: 'Aceptación y alcance' },
  { id: 'naturaleza', label: 'Naturaleza del servicio' },
  { id: 'cuenta', label: 'Cuenta y responsabilidades' },
  { id: 'dispositivos', label: 'Lecturas y dispositivos' },
  { id: 'uso', label: 'Uso permitido' },
  { id: 'disponibilidad', label: 'Disponibilidad y cambios' },
  { id: 'propiedad', label: 'Contenido y propiedad' },
  { id: 'responsabilidad', label: 'Límites de responsabilidad' },
  { id: 'ley', label: 'Ley aplicable y contacto' },
] as const

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Condiciones de uso"
      title="Reglas claras para usar AgroD"
      summary="Estos términos explican cómo puedes utilizar la plataforma y los dispositivos compatibles, qué responsabilidades asume cada parte y qué límites tiene un sistema de apoyo agrícola."
      sections={sections}
    >
      <section id="aceptacion">
        <h2>1. Aceptación y alcance</h2>
        <p>Estos términos se aplican al sitio, la cuenta, el panel y las funciones de AgroD relacionadas con fincas, cultivos, sensores y dispositivos. Al crear una cuenta o continuar utilizando el servicio, aceptas estas condiciones y la Política de privacidad.</p>
        <p>Si usas AgroD en nombre de una finca, organización o equipo, confirmas que tienes autorización para administrar esa cuenta y los datos que incorpores.</p>
      </section>

      <section id="naturaleza">
        <h2>2. Naturaleza del servicio</h2>
        <p>AgroD es un prototipo funcional y proyecto educativo en desarrollo que busca apoyar el monitoreo y la organización del trabajo agrícola. La plataforma puede mostrar lecturas de sensores, alertas, estados de dispositivos, mapas y sugerencias de prioridad según los datos disponibles.</p>
        <div className={styles.note}>
          <p><strong>AgroD sirve como herramienta de apoyo.</strong> No sustituye la observación directa, el criterio de un profesional agronómico ni las medidas de seguridad necesarias para cuidar un cultivo.</p>
        </div>
      </section>

      <section id="cuenta">
        <h2>3. Cuenta y responsabilidades</h2>
        <p>Debes proporcionar información razonablemente correcta, mantenerla actualizada y proteger tus credenciales. Eres responsable de la actividad realizada desde tu cuenta, salvo que nos informes oportunamente de un acceso no autorizado.</p>
        <p>Cuando utilices un equipo compartido, debes cerrar sesión. No puedes prestar la cuenta para eludir controles, suplantar a otra persona ni acceder a información que no te corresponda.</p>
      </section>

      <section id="dispositivos">
        <h2>4. Lecturas y dispositivos</h2>
        <p>La calidad de una lectura depende de factores como instalación, calibración, batería, cobertura, condiciones del terreno y comunicación entre el dispositivo y la plataforma. Una lectura atrasada, incompleta o incorrecta puede ocurrir aun cuando el panel esté disponible.</p>
        <p>Debes revisar la instalación y el estado físico de los sensores antes de tomar una decisión importante. Las alertas, rutas sugeridas y prioridades se calculan con la información que el sistema tiene disponible en ese momento.</p>
        <p>La función de sonido o localización de un dispositivo está pensada para facilitar su identificación en la finca. Debe usarse de forma responsable, respetando a las personas y animales cercanos y sin manipular el equipo en condiciones inseguras.</p>
      </section>

      <section id="uso">
        <h2>5. Uso permitido</h2>
        <p>Puedes utilizar AgroD para administrar tu operación, consultar datos y evaluar el servicio. No puedes:</p>
        <ul>
          <li>Intentar acceder a cuentas, dispositivos, servidores o datos de otras personas.</li>
          <li>Alterar lecturas, introducir código malicioso o interferir con la disponibilidad de la plataforma.</li>
          <li>Usar AgroD para una actividad ilegal, engañosa o que ponga en riesgo a otras personas.</li>
          <li>Copiar, revender o presentar la plataforma como propia sin autorización.</li>
          <li>Realizar pruebas de seguridad que puedan afectar el servicio sin permiso previo del equipo AgroD.</li>
        </ul>
        <p>Podemos limitar o suspender una cuenta cuando exista un riesgo razonable para la seguridad, un uso contrario a estas reglas o una obligación legal. Cuando sea posible, explicaremos la causa y la forma de solicitar una revisión.</p>
      </section>

      <section id="disponibilidad">
        <h2>6. Disponibilidad y cambios</h2>
        <p>Trabajamos para que AgroD sea estable, pero al tratarse de un producto en desarrollo puede haber mantenimiento, funciones experimentales, cambios de interfaz o interrupciones. No garantizamos disponibilidad continua ni que todos los modelos de sensores sean compatibles.</p>
        <p>Podemos mejorar, sustituir o retirar una función. Cuando un cambio sea importante para los datos o el uso normal de la cuenta, procuraremos comunicarlo con antelación razonable.</p>
      </section>

      <section id="propiedad">
        <h2>7. Contenido y propiedad</h2>
        <p>AgroD conserva los derechos sobre su nombre, identidad visual, software, diseño y contenido propio. Tú conservas los derechos que correspondan sobre la información de tu finca y los datos que aportes.</p>
        <p>Nos autorizas a procesar esos datos únicamente en la medida necesaria para prestar, proteger y mejorar las funciones que utilizas, conforme a la Política de privacidad.</p>
      </section>

      <section id="responsabilidad">
        <h2>8. Límites de responsabilidad</h2>
        <p>Las decisiones agrícolas dependen de circunstancias que AgroD no controla, como el clima, plagas, suelo, instalación del sensor, conectividad y acciones de terceros. Por eso, las lecturas y recomendaciones deben verificarse antes de ejecutar una decisión que pueda causar una pérdida relevante.</p>
        <p>En la medida permitida por la legislación aplicable, AgroD no responde por pérdidas causadas exclusivamente por datos erróneos de un dispositivo externo, una instalación incorrecta, falta de conectividad, uso contrario a estas instrucciones o decisiones tomadas sin una verificación razonable.</p>
        <p>Nada en estos términos elimina derechos o responsabilidades que la ley no permita excluir.</p>
      </section>

      <section id="ley">
        <h2>9. Ley aplicable y contacto</h2>
        <p>Estos términos se interpretan conforme a la legislación aplicable de la República Dominicana. Antes de iniciar una controversia formal, procuraremos revisar el caso y buscar una solución directa de buena fe.</p>
        <p>Para preguntas, reportes o solicitudes relacionadas con estos términos, utiliza el canal de atención que el equipo AgroD entrega durante el registro o la instalación.</p>
        <p>Podemos actualizar estos términos cuando cambie el servicio. Publicaremos la nueva versión y su fecha de vigencia; si el cambio es sustancial, también lo comunicaremos dentro del sitio o la cuenta.</p>
      </section>
    </LegalShell>
  )
}
