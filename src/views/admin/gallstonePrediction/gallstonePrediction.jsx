import React, { useState } from 'react';
import { FileUpload } from 'components/admin/GallstonePrediction/FileUpload';
import { PredictionResults } from 'components/admin/GallstonePrediction/PredictionResults';
import { FileText, Brain, Zap } from 'lucide-react';

const GallstonePrediction = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setPredictionResult(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('pdf_file', uploadedFile);

      const response = await fetch('http://localhost:8000/predict-gallstone', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to process PDF');
      }

      // Get the PDF blob from the response
      const pdfBlob = await response.blob();
      
      // Create a URL for the PDF blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Set the prediction result with the PDF URL
      setPredictionResult({
        pdfUrl,
        fileName: 'gallstone_prediction_report.pdf'
      });
    } catch (error) {
      console.error('Prediction failed:', error);
      setError(error.message || 'Failed to process PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl shadow-lg" style={{background: 'linear-gradient(to right, #3B8F4F, #2D7A3D)'}}>
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4" style={{background: 'linear-gradient(to right, #3B8F4F, #2D7A3D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
            Gallstone Prediction
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload your PDF document and get AI-powered predictions and insights in seconds
          </p>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center justify-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
            <FileText className="w-5 h-5 mr-3" style={{color: '#3B8F4F'}} />
            <span className="text-slate-700 font-medium">PDF Upload</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
            <Brain className="w-5 h-5 mr-3" style={{color: '#3B8F4F'}} />
            <span className="text-slate-700 font-medium">AI Analysis</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
            <Zap className="w-5 h-5 mr-3" style={{color: '#3B8F4F'}} />
            <span className="text-slate-700 font-medium">Instant Results</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">
            <FileUpload
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
              isProcessing={isProcessing}
            />

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {uploadedFile && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <button
                  onClick={handlePredict}
                  disabled={isProcessing}
                  className="w-full text-white font-semibold py-4 px-8 rounded-2xl 
                           hover:opacity-90 disabled:opacity-50 
                           transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed
                           shadow-lg hover:shadow-xl"
                  style={{
                    background: isProcessing ? '#94a3b8' : '#3B8F4F'
                  }}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Analyzing PDF...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Brain className="w-5 h-5 mr-3" />
                      Predict & Analyze
                    </div>
                  )}
                </button>
              </div>
            )}

            {predictionResult && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <PredictionResults result={predictionResult} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallstonePrediction;
