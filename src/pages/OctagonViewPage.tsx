import React, { useState, useEffect } from 'react'; // Asegúrate de importar useEffect
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo'; // Asumo que la ruta es correcta
import OctagonView from '../components/OctagonView'; // Asumo que la ruta es correcta
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Tu array de 'attributes' permanece igual...
const attributes = [
  {
    id: 'financial-capacity', // Asegúrate que estos IDs coincidan con los `segmentIdentifier` que envías desde Unity
    name: 'Financial Capacity',
    description: 'Income level, debt-to-income ratio, and free cash flow patterns',
    overview: 'Your customer base shows diverse financial capacity ranging from high-income maximizers to budget-conscious planners. 40% demonstrate strong disposable income with low debt ratios.',
    segments: ['High-Income Maximizers', 'Middle-Income Planners', 'Financially At-Risk']
  },
  {
    id: 'credit-profile',
    name: 'Credit Profile', 
    description: 'Credit score distributions, payment history, and utilization rates',
    overview: 'Strong overall credit health with 65% of customers maintaining excellent scores above 750. Payment history shows consistent reliability across most segments.',
    segments: ['Prime Credit', 'Near-Prime', 'Credit Building']
  },
  // ... (resto de tus atributos)
  {
    id: 'wealth-indicators', // Ejemplo: este ID debe coincidir con el que Unity envía para este segmento
    name: 'Wealth Indicators',
    description: 'Investable assets, property ownership, and investment activity',
    overview: 'Growing wealth concentration with 25% holding significant investable assets. Property ownership correlates strongly with long-term banking relationships.',
    segments: ['High Net Worth', 'Emerging Affluent', 'Asset Building']
  }
];


const OctagonViewPage = () => {
  const [selectedAttribute, setSelectedAttribute] = useState(attributes[0]);
  const navigate = useNavigate();

  const handleAttributeSelect = (attribute: typeof attributes[0]) => {
    setSelectedAttribute(attribute);
    // Opcional: Si quieres que Unity también reaccione a estos botones, necesitarías una función
    // para enviar un mensaje A Unity aquí, por ejemplo, para que la cámara de Unity se mueva.
    // unityInstanceRef.current?.SendMessage('OctagonManager', 'SelectSegmentByName', attribute.id);
  };

  const handleViewProfiles = () => {
    navigate(`/profiles/${selectedAttribute.id}`);
  };

  // --- 1. FUNCIÓN DE CALLBACK PARA LOS CLICS DE UNITY ---
  const handleUnitySegmentClicked = (segmentIdFromUnity: string, isNowSelected: boolean) => {
    console.log(`[OctagonViewPage] Recibido desde Unity: Segmento ID='${segmentIdFromUnity}', Seleccionado=${isNowSelected}`);

    // Encuentra el atributo correspondiente al ID recibido desde Unity
    const clickedAttribute = attributes.find(attr => attr.id === segmentIdFromUnity);

    if (clickedAttribute) {
      if (isNowSelected) {
        // Si el segmento fue SELECCIONADO en Unity, actualiza el estado aquí
        setSelectedAttribute(clickedAttribute);
        console.log(`[OctagonViewPage] Atributo '${clickedAttribute.name}' seleccionado vía Unity.`);
      } else {
        // Si el segmento fue DESELECCIONADO en Unity, podrías:
        // a) No hacer nada si quieres que la selección persista hasta otro clic en los botones/Unity.
        // b) Si 'selectedAttribute.id' es el mismo que 'segmentIdFromUnity', podrías resetear a un estado por defecto
        //    o al primer atributo, pero esto podría entrar en conflicto si tienes una lógica de "ninguno seleccionado".
        //    Por ahora, lo más simple es que la selección en la UI se actualice solo cuando un nuevo atributo es *seleccionado*.
        if (selectedAttribute.id === segmentIdFromUnity) {
          console.log(`[OctagonViewPage] Atributo '${clickedAttribute.name}' deseleccionado en Unity. La UI no cambia el atributo activo a menos que otro sea seleccionado.`);
        }
      }
    } else {
      console.warn(`[OctagonViewPage] Atributo con ID '${segmentIdFromUnity}' no encontrado.`);
    }
    // Aquí puedes añadir más lógica específica de tu aplicación basada en el clic de Unity
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-7xl">
        <header className="flex items-center justify-between mb-8">
          <Logo size="md" />
          <div className="text-gray-500 text-sm">Step 3 of 6</div>
        </header>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Segmentation Map
          </h1>
          <p className="text-gray-600 mt-2">
            Our AI has identified 8 key attributes that define your customer landscape
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-center">Customer Segmentation Octagon</h2>
              {/* --- 2. PASAR LA URL DE NETLIFY Y EL CALLBACK A OctagonView --- */}
              <OctagonView
                selectedAttribute={selectedAttribute.id}
                unityModelUrl="https://6839051051d0806a83d68b6e--rococo-llama-238af9.netlify.app/" // <<-- TU URL DE NETLIFY AQUÍ
                onOctagonSegmentClicked={handleUnitySegmentClicked} // <<-- TU FUNCIÓN DE CALLBACK AQUÍ
              />
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {attributes.map((attribute) => (
                <Button
                  key={attribute.id}
                  onClick={() => handleAttributeSelect(attribute)}
                  variant={selectedAttribute.id === attribute.id ? "default" : "outline"}
                  className={`p-3 h-auto text-xs ${
                    selectedAttribute.id === attribute.id 
                      ? 'bg-brand-500 hover:bg-brand-600 text-white' 
                      : 'hover:bg-brand-50 hover:border-brand-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">{attribute.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="h-fit p-6 bg-white shadow-sm">
              <h2 className="text-xl font-bold mb-4">Attribute Insight</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-brand-600 mb-2">
                    {selectedAttribute.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedAttribute.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">General Overview</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedAttribute.overview}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Related Customer Segments</h4>
                  <div className="space-y-2">
                    {selectedAttribute.segments.map((segment, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-brand-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">{segment}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button 
                  onClick={handleViewProfiles}
                  className="w-full mt-6 bg-brand-500 hover:bg-brand-600"
                >
                  See Related Customer Profiles
                </Button>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Click the attribute buttons below the octagon or interact directly with the 3D model to explore different customer dimensions.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OctagonViewPage;