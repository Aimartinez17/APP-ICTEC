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
    LOCALIZACION:'',
    ATS_OPERATIVO:'',
    LA_UNIDAD_PRESENTA_ALARMAS_EN_EL_LOG_DE_EVENTOS:'',
    LIMPIEZA_DE_LA_UNIDAD:'',
    VERIFICACION_TERMOGRAFICA_DE_LOS_COMPONENTES_ELECTRONICOS_Y_ELECTRICOS:'',
    VERIFICACION_VISUAL_ESTADO_DEL_SWICHT_DE_TRANSFERENCIA:'',
    VERIFICACION_DE_INDICADORES_LUMINOSOS_DEL_PANEL_DE_CONTROL:'',
    VERIFICACION_DE_FASE_FUENTE_ENTRADA_RED_COMERCIAL:'',
    VERIFICACION_DE_FASE_FUENTE_SALIDA_ATS:'',
    AJUSTE_DE_CONEXIONES:'',
    PRUEBA_DE_CORTE_Y_TRANSFERENCIA_CON_CARGA:'',
    VERIFICACION_DE_FASE_FUENTE_GRUPO_GENERADOR:'',
    VOLTAJE_ENTRADA_RED_COMERCIAL_L1L2:'',
    VOLTAJE_ENTRADA_RED_COMERCIAL_L1L3:'',

  });

  const [state4, setState4] = useState({ 
    VOLTAJE_ENTRADA_RED_COMERCIAL_L2L3:'',
    VOLTAJE_ENTRADA_RED_COMERCIAL_L1N:'',
    VOLTAJE_ENTRADA_RED_COMERCIAL_L2N:'',
    VOLTAJE_ENTRADA_RED_COMERCIAL_L3N:'',
    VOLTAJE_ENTRADA_GRUPO_GENERADOR_L1L2:'',
    VOLTAJE_ENTRADA_GRUPO_GENERADOR_L1L3:'',
    VOLTAJE_ENTRADA_GRUPO_GENERADOR_L2L3:'',
    VOLTAJE_ENTRADA_GRUPO_GENERADOR_L1N:'',
    VOLTAJE_ENTRADA_GRUPO_GENERADOR_L2N:'',
    VOLTAJE_ENTRADA_GRUPO_GENERADOR_L3N:'',
    VOLTAJE_SALIDA_ATS_L1L2:'',
    VOLTAJE_SALIDA_ATS_L1_L3:'',
    VOLTAJE_SALIDA_ATS_L2L3:'',
    VOLTAJE_NG:'',
    CORRIENTE_SALIDA_ATS_L1:'',
    CORRIENTE_SALIDA_ATS_L2:'',
    CORRIENTE_SALIDA_ATS_L3:'',
    FRECUENCIA:'',    
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
    doc.text(`Descripción: ${state3.Descripción}`, 10, 24, { fontSize: 8 });
    doc.text('SUBTAREAS', 10, 60);
    doc.setFontSize(9);
    doc.text(`LOCALIZACION : ${state3.LOCALIZACION}`, 10, 74, { fontSize: 8 });
    doc.text(`¿ATS OPERATIVO? : ${state3.ATS_OPERATIVO}`, 10, 80, { fontSize: 8 });
    doc.text(`¿LA UNIDAD PRESENTA ALARMAS EN EL LOG DE EVENTOS?: ${state3.LA_UNIDAD_PRESENTA_ALARMAS_EN_EL_LOG_DE_EVENTOS}`, 10, 86, { fontSize: 8 });
    doc.text(`LIMPIEZA GENERAL DE LA UNIDAD: ${state3.LIMPIEZA_DE_LA_UNIDAD}`, 10, 92, { fontSize: 8 });
    doc.text(`VERIFICACION TERMOGRAFICA DE LOS COMPONENTES ELECTRONICOS Y ELECTRICOS: ${state3.VERIFICACION_TERMOGRAFICA_DE_LOS_COMPONENTES_ELECTRONICOS_Y_ELECTRICOS}`, 10, 98, { fontSize: 8 });
    doc.text(`VERIFICACION VISUAL ESTADO DEL SWICHT DE TRANSFERENCIA: ${state3.VERIFICACION_VISUAL_ESTADO_DEL_SWICHT_DE_TRANSFERENCIA}`, 10, 104, { fontSize: 8 });
    doc.text(`VERIFICACION DE INDICADORES LUMINOSOS DEL PANEL DE CONTROL: ${state3.VERIFICACION_DE_INDICADORES_LUMINOSOS_DEL_PANEL_DE_CONTROL}`, 10, 110, { fontSize: 8 });
    doc.text(`VERIFICACION DE FASE FUENTE ENTRADA RED COMERCIAL ${state3.VERIFICACION_DE_FASE_FUENTE_ENTRADA_RED_COMERCIAL}`, 10, 116, { fontSize: 8 });
    doc.text(`VERIFICACION DE FASE FUENTE SALIDA ATS: ${state3.VERIFICACION_DE_FASE_FUENTE_SALIDA_ATS}`, 10, 122, { fontSize: 8 });
    doc.text(`AJUSTE DE CONEXIONES: ${state3.AJUSTE_DE_CONEXIONES}`, 10, 128, { fontSize: 8 });
    doc.text(`PRUEBA DE CORTE Y TRANSFERENCIA CON CARGA: ${state3.PRUEBA_DE_CORTE_Y_TRANSFERENCIA_CON_CARGA}`, 10, 134, { fontSize: 8 });
    doc.text(`VERIFICACION DE FASE FUENTE GRUPO GENERADOR: ${state3.VERIFICACION_DE_FASE_FUENTE_GRUPO_GENERADOR}`, 10, 140, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA RED COMERCIAL L1-L2 (VAC): ${state3.VOLTAJE_ENTRADA_RED_COMERCIAL_L1L2}`, 10, 146, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA RED COMERCIAL L1-L3 (VAC): ${state3.VOLTAJE_ENTRADA_RED_COMERCIAL_L1L3}`, 10, 152, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA RED COMERCIAL L2-L3 (VAC): ${state4.VOLTAJE_ENTRADA_GRUPO_GENERADOR_L2L3}`, 10, 160, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA RED COMERCIAL L1-N (VAC): ${state4.VOLTAJE_ENTRADA_GRUPO_GENERADOR_L1N}`, 10, 166, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA RED COMERCIAL L2-N (VAC): ${state4.VOLTAJE_ENTRADA_GRUPO_GENERADOR_L2N}`, 10, 172, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA RED COMERCIAL L3-N (VAC): ${state4.VOLTAJE_ENTRADA_GRUPO_GENERADOR_L3N}`, 10, 178, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA GRUPO GENERADOR L1-L2 (VAC): ${state4.VOLTAJE_ENTRADA_GRUPO_GENERADOR_L1L2}`, 10, 184, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA GRUPO GENERADOR L1-L3 (VAC): ${state4.VOLTAJE_ENTRADA_GRUPO_GENERADOR_L1L3}`, 10, 190, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA GRUPO GENERADOR L2-L3 (VAC): ${state4.VOLTAJE_ENTRADA_GRUPO_GENERADOR_L2L3}`, 10, 196, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA GRUPO GENERADOR L1-N (VAC): ${state4.VOLTAJE_ENTRADA_GRUPO_GENERADOR_L2N}`, 10, 202, { fontSize: 8 });
    doc.text(`VOLTAJE ENTRADA GRUPO GENERADOR L3-N (VAC): ${state4.VOLTAJE_ENTRADA_GRUPO_GENERADOR_L3N}`, 10, 208, { fontSize: 8 });
    doc.text(`VOLTAJE SALIDA ATS L1-L2 (VAC): ${state4.VOLTAJE_SALIDA_ATS_L1L2}`, 10, 214, { fontSize: 8 });
    doc.text(`VOLTAJE SALIDA ATS L1-L3 (VAC): ${state4.VOLTAJE_SALIDA_ATS_L1_L3}`, 10, 220, { fontSize: 8 });
    doc.text(`VOLTAJE SALIDA ATS L2-L3 (VAC)): ${state4.VOLTAJE_SALIDA_ATS_L2L3}`, 10, 226, { fontSize: 8 });
    doc.text(`VOLTAJE N-G (VAC)): ${state4.VOLTAJE_NG}`, 10, 232, { fontSize: 8 });
    doc.text(`CORRIENTE SALIDA ATS L1 (A): ${state4.CORRIENTE_SALIDA_ATS_L1}`, 10, 238, { fontSize: 8 });
    doc.text(`CORRIENTE SALIDA ATS L2 (A) ${state4.CORRIENTE_SALIDA_ATS_L2}`, 10, 244, { fontSize: 8 });
    doc.text(`CORRIENTE SALIDA ATS L3 (A): ${state4.CORRIENTE_SALIDA_ATS_L3}`, 10, 250, { fontSize: 8 });
    doc.text(`FRECUENCIA (HZ): ${state4.FRECUENCIA}`, 10, 256, { fontSize: 8 });
   





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