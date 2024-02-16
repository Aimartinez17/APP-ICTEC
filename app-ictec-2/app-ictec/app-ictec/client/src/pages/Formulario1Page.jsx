import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import logo from '../css/logo.png'; 
import '../css/Monofasico.css'; 
import SignatureCanvas from 'react-signature-canvas';
import Cookies from 'js-cookie';
const MonofasicoPage = () => {
  const navigate = useNavigate();
  const [tokenRemoved, setTokenRemoved]= useState(false)
  const formatPropertyName = (name) => name.replace(/_/g, ' ');

  const [step, setStep] = useState(1); 
  const [state1, setState1] = useState({
    Fecha: '',
    Generó: '',
    Responsable: '',
    Descripción: '',
    Ubicación: '',
    Tipo: '',
    Clasificación1: '',
    Prioridad: '',
    Clasificación2: '',
    Código_de_barras: '',
    Marca: '',
    Modelo: '',
    Serie: '',
    Sistema: '',
    Tipo_1: '',
    Capacidad: '',
    Voltaje: '',
  });
  const [state2, setState2] = useState({
    Frecuencia: '',
    Banco_de_Baterias: '',
    Cantidad_de_Baterias: '',
    Capacidad_de_baterias_Ah: '',
    Voltaje_de_banco_de_baterias_VDC: '',
    Tipo_de_bateria: '',
    Cantidad_de_string: '',
    Descripción2: '',
    Fecha_Programada: '',
    Tipo_de_Tarea: '',
    Observaciones: '',
  });
  const [state3, setState3] = useState({
    Clasificación: '',
    Descripción:'',
    UPS_OPERATIVO:'',
    DESARMADO_DE_EQUIPO_UPS:'',
    LA_UNIDAD_PRESENTA_ALARMAS_EN_EL_LOG_DE_EVENTOS:'',
    ESPERAR_QUE_EL_UPS_SE_APAGUE_POR_COMPLETO_Y_LOS_VENTILADORES_DEJEN_DE_GIRAR_POR_COMPLETO:'',
    VERIFICACION_VISUAL_DE_LOS_COMPONENTES_ELECTRONICOS:'',
    REALICE_BLOQUEO_DE_VENTILADORES:'',
    LIMPIEZA_DE_LA_UNIDAD:'',
    VERIFICACION_DEL_ESTADO_DE_BATERIAS:'',
    VERIFICACION_DEL_ESTADO_DE_VENTILADORES:'',
    VERIFICAR_FECHA_DE_FABRICACION:'',
    VOLTAJE_DE_BATERIAS_VDC:'',
    VERIFICAR_RES_INTERNA:'',
    AJUSTES_DE_CONEXIÓN:'',
    ARMADO_UPS:'',
    ENCENDER_EQUIPO:'',
  });
  const [state4, setState4] = useState({ 
    Corriente_de_entradal1: '',
    VoltInUPSL1:'',
    VoltInBYPASSL1L2:'',
    VoltInBYPASSL1N:'',
    VoltOutL1N:'',
    VoltajeNG:'',
    CorrienteOut:'',
});
const [state5, setState5] = useState({ 
 
});
const [state6, setState6] = useState({ 
  Nombre_Responsable_ICTEC: '',
  Nombre_Responsable_CLIENTE:'',
});

const cerrarsesion = () => {
  Cookies.remove('token');
  setTokenRemoved(true);
};

useEffect(() => {
  if (tokenRemoved) {
    navigate('/');
  }
}, [tokenRemoved]);

const redirectToMenuPage = () => {
  navigate('/tasks'); 
};
  const imagesRef = useRef(new Array(10).fill(null));
  const [signatures, setSignatures] = useState([null, null]);
  const [images, setImages] = useState([]);
  const sigPads = useRef([React.createRef(), React.createRef()]);
 
  const [seleccionMultiple, setSeleccionMultiple] = useState([]);

  const handleInputChange = (e, currentStep) => {
    const { name, value } = e.target;
    if (currentStep === 1) {
      setState1({ ...state1, [name]: value });
    } else if (currentStep === 2) {
      setState2({ ...state2, [name]: value });
    } else if (currentStep === 3) {
      setState3({ ...state3, [name]: value });
    } else if (currentStep === 4) {
      setState4({ ...state4, [name]: value });
    }else if (currentStep === 5) {
      setState5({ ...state5, [name]: value });
    } else if (currentStep === 6) {
      setState6({ ...state6, [name]: value });
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        setImages(prevImages => [...prevImages, e.target.result]); // Agregar la nueva imagen al array
      };
    })(file);
    reader.readAsDataURL(file);
  };

  const saveSignature = (index) => {
    if (sigPads.current[index] && sigPads.current[index].current) {
      const signatureImage = sigPads.current[index].current.toDataURL();
      setSignatures((prevSignatures) => {
        const newSignatures = [...prevSignatures];
        newSignatures[index] = signatureImage;
        return newSignatures;
      });
    }
  };
  

  const generatePDF = () => {
    const doc = new jsPDF();
        //DISEÑO DE MEMBRETE 
    doc.addImage(logo, 'png', 15, 10, 20, 16);
    const lineHeight = 7; // Altura de línea para el texto
    const margin = 10; // Margen para el documento
    const pageWidth = doc.internal.pageSize.width;
    const maxLineWidth = pageWidth - (margin * 3); // Ancho máximo para el texto

    //tabla base
    // borders
    doc.setLineWidth(0.1);
    doc.rect(5, 5, 200, 286); // margen
    doc.line(5, 30, 205, 30); // encabezado
    doc.line(5, 50, 205, 50); // datos generales
    doc.line(5, 90, 205, 90); // Activos
    doc.line(5, 57, 205, 57); // Activos
    doc.line(5, 100, 205, 100); // Nombre campo y valor
   // doc.line(100, 100, 100, 200); // 
    doc.line(5, 200, 205, 200); // 
    doc.line(5, 210, 205, 210); //Tareas planificadas

    //contenido prellenado
    
    doc.setFontSize(14);
    doc.text('Sistema de Gestion de Mantenimiento', 40, 16);
    doc.text('ENERGÍA', 40, 22, { fontSize: 18 }); 
    doc.setFontSize(10);
    doc.text('Fecha:', 160, 22, { fontSize: 18 });//encabezado
    doc.text(`Generó: ${state1.Generó}`, 10, 40, { fontSize: 8 });
    doc.text(`Responsable: ${state1.Responsable}`, 10, 46, { fontSize: 8 });
    doc.setFontSize(14);
    doc.text('ACTIVOS', 10, 56);
    doc.setFontSize(10);
    doc.text(`Descripcion: ${state1.Descripción}`, 10, 62, { fontSize: 8 });
    doc.text(`Ubicacion: ${state1.Ubicación}`, 10, 68, { fontSize: 8 });
    doc.text(`Tipo: ${state1.Tipo}`, 10, 74, { fontSize: 8 });
    doc.text(`Clasificacion 1: ${state1.Clasificación1}`, 80, 74, { fontSize: 8 });
    doc.text(`Prioridad: ${state1.Prioridad}`, 10, 80, { fontSize: 8 });
    doc.text(`Clasificacion 2: ${state1.Clasificación2}`, 80, 80, { fontSize: 8 });
    doc.text(`Codigo de barras: ${state1.Código_de_barras}`, 10, 86, { fontSize: 8 });
    doc.setFontSize(14);
    doc.text('NOMBRE DE CAMPO Y VALOR', 10, 96);
    doc.setFontSize(10);
    doc.text(`Marca: ${state1.Marca}`, 10, 108, { fontSize: 8 });
    doc.text(`Modelo: ${state1.Modelo}`, 10, 115, { fontSize: 8 });
    doc.text(`Serie: ${state1.Serie}`, 10, 122, { fontSize: 8 });
    doc.text(`Sistema: ${state1.Sistema}`, 10, 129, { fontSize: 8 });
    doc.text(`Tipo_1: ${state1.Tipo_1}`, 10, 136, { fontSize: 8 });
    doc.text(`Capacidad (KVA): ${state1.Capacidad}`, 10, 143, { fontSize: 8 });
    doc.text(`Voltaje (VAC): ${state1.Voltaje}`, 10, 150, { fontSize: 8 });
    doc.text(`Frecuencia: ${state2.Frecuencia}`, 10, 157, { fontSize: 8 });
    doc.text(`Banco de baterias : ${state2.Banco_de_Baterias}`, 10, 164 , { fontSize: 8 });
    doc.text(`Cantidad de baterias : ${state2.Cantidad_de_Baterias}`, 10, 171, { fontSize: 8 });
    doc.text(`Capacidad de bateria (Ah): ${state2.Capacidad_de_baterias_Ah}`, 10, 178, { fontSize: 8 });
    doc.text(`Voltaje de banco de baterias : ${state2.Voltaje_de_banco_de_baterias_VDC}`, 10, 185, { fontSize: 8 });
    doc.text(`Tipo de bateria : ${state2.Tipo_de_bateria}`, 10, 192, { fontSize: 8 });
    doc.text(`Cantidad de strings : ${state2.Cantidad_de_string}`, 10, 199, { fontSize: 8 });
    doc.setFontSize(14);
    doc.text('TAREAS PLANIFICADAS', 10, 206);
    doc.setFontSize(10);
    doc.text(`Descripcion : ${state2.Descripción2}`, 10, 215, { fontSize: 8 });
    doc.text(`Fecha programada : ${state2.Fecha_Programada}`, 10, 221, { fontSize: 8 });
    doc.text(`Tipo de tarea : ${state2.Tipo_de_Tarea}`, 10, 227, { fontSize: 8 });
    doc.text(`Observaciones : ${state2.Observaciones}`, 10, 235, { fontSize: 8 });
    // Para agregar una nueva página:
    doc.addPage();

    doc.setLineWidth(0.1);
    doc.rect(5, 5, 200, 286); // margen
    doc.rect(5, 15, 200, 286); // clasificacion
    doc.line(5, 25, 205, 25); // recursos a utilizar
    doc.line(5, 55, 205, 55); // 
    doc.line(5, 65, 205, 65); // SUBTAREAS

    //contenido prellenado
    doc.setFontSize(14);
    doc.text(`Clasificación: ${state3.Clasificación}`, 10, 12, { fontSize: 8 });
    doc.text('RECURSOS A UTILIZAR', 10, 21);
    doc.text('SUBTAREAS', 10, 60);
    doc.setFontSize(9);
    doc.text(`Descripción: ${state3.Descripción}`, 10, 68, { fontSize: 8 });
    doc.text(`UPS OPERATIVO? : ${state3.UPS_OPERATIVO}`, 10, 74, { fontSize: 8 });
    doc.text(`DESARMADO DE EQUIPO UPS : ${state3.DESARMADO_DE_EQUIPO_UPS}`, 10, 80, { fontSize: 8 });
    doc.text(`LA UNIDAD PRESENTA ALARMAS EN EL LOG DE EVENTOS? : ${state3.LA_UNIDAD_PRESENTA_ALARMAS_EN_EL_LOG_DE_EVENTOS}`, 10, 86, { fontSize: 8 });
    doc.text(`ESPERAR QUE EL UPS SE APAGUE POR COMPLETO Y LOS VENTILADORES DEJEN DE GIRAR POR COMPLETO: ${state3.ESPERAR_QUE_EL_UPS_SE_APAGUE_POR_COMPLETO_Y_LOS_VENTILADORES_DEJEN_DE_GIRAR_POR_COMPLETO}`, 10, 92, { fontSize: 8 });
    doc.text(`VERIFICACIÓN VISUAL DE LOS COMPONENTES ELECTRÓNICOS : ${state3.VERIFICACION_VISUAL_DE_LOS_COMPONENTES_ELECTRONICOS}`, 10, 98, { fontSize: 8 });
    doc.text(`REALICE EL BLOQUEO DE VENTILADORES : ${state3.REALICE_BLOQUEO_DE_VENTILADORES}`, 10, 104, { fontSize: 8 });
    doc.text(`LIMPIEZA DE LA UNIDAD : ${state3.LIMPIEZA_DE_LA_UNIDAD}`, 10, 110, { fontSize: 8 });
    doc.text(`VERIFICACIÓN DEL ESTADO DE BATERIAS : ${state3.VERIFICACION_DEL_ESTADO_DE_BATERIAS}`, 10, 116, { fontSize: 8 });
    doc.text(`VERIFICACION DEL ESTADO DE VENTILADORES : ${state3.VERIFICACION_DEL_ESTADO_DE_VENTILADORES}`, 10, 122, { fontSize: 8 });
    doc.text(`VERIFICAR FECHA DE FABRICACION : ${state3.VERIFICAR_FECHA_DE_FABRICACION}`, 10, 128, { fontSize: 8 });
    doc.text(`VOLTAJE DE LA BATERÍA(VDC) : ${state3.VOLTAJE_DE_BATERIAS_VDC}`, 10, 134, { fontSize: 8 });
    doc.text(`VERIFICACIÓN DE RESISTENCIA INTERNA DE BATERIAS(Solo en reporte previo de problemas de funcionamiento): ${state3.VERIFICAR_RES_INTERNA}`, 10, 140, { fontSize: 8 });
    doc.text(`AJUSTES DE CONEXIÓN: ${state3.AJUSTES_DE_CONEXIÓN}`, 10, 146, { fontSize: 8 });
    doc.text(`ARMADO DE EQUIPO UPS : ${state3.ARMADO_UPS}`, 10, 152, { fontSize: 8 });
    doc.text(`ENCENDER EL EQUIPO UPS(SEGÚN PROCEDIMIENTO) : ${state3.ENCENDER_EQUIPO}`, 10, 160, { fontSize: 8 });
    doc.text(`CORRIENTE DE ENTRADA L1(A): ${state4.Corriente_de_entradal1}`, 10, 166, { fontSize: 8 });
    doc.text(`CORRIENTE DE ENTRADA DE UPS L1-N(VAC): ${state4.VoltInUPSL1}`, 10, 172, { fontSize: 8 });
    doc.text(`VOLTAJE DE ENTRADA DE BYPASS DE UPS L1-L2(VAC): ${state4.VoltInBYPASSL1L2}`, 10, 178, { fontSize: 8 });
    doc.text(`VOLTAJE DE ENTRADA DE BYPASS DE UPS L1-N(VAC): ${state4.VoltInBYPASSL1N}`, 10, 184, { fontSize: 8 });
    doc.text(`VOLTAJE DE DE SALIDA DE UPS L1-N: ${state4.VoltOutL1N}`, 10, 190, { fontSize: 8 });
    doc.text(`VOLTAJE N-G(VAC): ${state4.VoltajeNG}`, 10, 196, { fontSize: 8 });
    doc.text(`CORRIENTE DE SALIDA L1(A): ${state4.CorrienteOut}`, 10, 202, { fontSize: 8 });

    doc.addPage();
    doc.rect(5, 5, 200, 286);

    const imageWidth = 50;
    const imageHeight = 50;
    const maxImagesPerRow = 3;
    const marginX = 10; 
    const marginY = 10; 

    let x = 10;
    let y = 10;

    images.forEach((imageSrc, index) => {
      if (imageSrc && index < 10) { 
          doc.addImage(imageSrc, 'JPEG', x, y, imageWidth, imageHeight);
          x += imageWidth + marginX;
          if ((index + 1) % maxImagesPerRow === 0) {
              x = 10;
              y += imageHeight + marginY;
          }
      }
  });
    doc.addPage();
    doc.rect(5, 5, 200, 286); // margen
    doc.text(`Nombre responsable ICTEC : ${state6.Nombre_Responsable_ICTEC}`, 70, 240, { fontSize: 8 });
    doc.text(`Nombre responsable CLIENTE : ${state6.Nombre_Responsable_CLIENTE}`, 70, 260, { fontSize: 8 });

    // Añadir firmas
    signatures.forEach((signatureSrc, index) => {
      if (signatureSrc) {
        doc.addImage(signatureSrc, 'PNG', 95, 215 + index * 20, 50, 20); // Ajustar según sea necesario
      }
    });
  


    let yCoordinate = 105;
    let allFieldsValid = true;

    yCoordinate += 50;


    doc.save('formulario_monofasico.pdf');
  };

  const handleSubmit = () => {
    generatePDF();
   
  };
 
  return (
    <div className="container_mon">
        {step === 1 && (
          <div>
            {Object.keys(state1).map((key, index) => (
              <div key={index}>
                <label className='texto_prg' htmlFor={key}>{formatPropertyName(key)}</label>
                <input 
                  className='input_prg'
                  type="text"
                  name={key}
                  value={state1[key]}
                  onChange={(e) => handleInputChange(e, 1)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Paso 2 */}
        {step === 2 && (
            <div>
            {Object.keys(state2).map((key, index) => (
                <div key={index}>
                    <label className='texto_prg' htmlFor={key}>{formatPropertyName(key)}</label>
                    <input
                        className='input_prg'
                        type="text"
                        name={key}
                        value={state2[key]}
                        onChange={(e) => handleInputChange(e, 2)}
                    />
                </div>
            ))}
          </div>
        )}

        {/* Paso 3 */}
        {step === 3 && (
           <div>
           {Object.keys(state3).map((key, index) => (
               <div className={`field_pregunta${index + 1}`} key={index}>
                   <label className='texto_prg' htmlFor={key}>{formatPropertyName(key)}</label>
                   <input
                       className='input_prg'
                       type="text"
                       id={key}
                       name={key}
                       value={state3[key]}
                       onChange={(e) => handleInputChange(e, 3)}
                   />
               </div>
           ))}
         </div>
        )}
           {step === 4 && (
            <div>
            {Object.keys(state4).map((key, index) => (
                <div className={`field_pregunta${index + 1}`} key={index}>
                    <label className='texto_prg' htmlFor={key}>{formatPropertyName(key)}</label>
                    <input
                        className='input_prg'
                        type="text"
                        id={key}
                        name={key}
                        value={state4[key]}
                        onChange={(e) => handleInputChange(e, 4)}
                    />
                </div>
            ))}
          </div>
        )}
      {step === 5 && (
          <div>
            {/* Inputs para subir imágenes */}
            <h2>ADJUNTE LAS IMAGENES DEL SERVICIO</h2>
            {imagesRef.current.map((_, index) => (
              <input
                className='input-images'
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 5)}
                key={index}
              />
            ))}
          </div>
        )}

        {step === 6 && (
          <div className='firma'>
            <h2>Por favor adjunte la firma y su aclaración</h2>
            {signatures.map((_, index) => (
              <div key={index}>
                <SignatureCanvas
                  penColor='black'
                  canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                  ref={sigPads.current[index]}
                />
                <button onClick={() => saveSignature(index)}>Guardar Firma</button>
              </div>
            ))}
              {Object.keys(state6).map((key, index) => (
                <div className={`field_pregunta${index + 1}`} key={index}>
                    <label htmlFor={key}>{formatPropertyName(key)}</label>
                    <input
                        className='texto-firmas'
                        type="text"
                        id={key}
                        name={key}
                        value={state6[key]}
                        onChange={(e) => handleInputChange(e, 6)}
                    />
                </div>
            ))}
          </div>
          
        )}

        <div className="button-container">
          {step === 1 && (
            <button className="redirect-button" onClick={redirectToMenuPage}>
              Menu</button>
          )}
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="prev-button">
              Anterior
            </button>
          )}
          {step < 6 && (
            <button onClick={() => setStep(step + 1)} className="next-button">
              Siguiente
            </button>
          )}
          {step === 6 && (
            <div>
              <button onClick={handleSubmit} className="submit-button">
                Generar PDF
              </button>
              <button onClick={cerrarsesion} className='close-btt'>
                Cerrar Sesion
              </button>
            </div>
            )}
        </div>
    </div>
  );
};

export default MonofasicoPage;