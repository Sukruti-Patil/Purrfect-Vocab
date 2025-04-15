
import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { fetchObjectInfo } from './object-info-service';

interface Detection {
  bbox: [number, number, number, number];
  class: string;
  score: number;
}

interface ObjectInfo {
  word: string;
  meaning: string;
  pronunciation?: string;
  example: string;
  popCulture: {
    title: string;
    type: 'movie' | 'series' | 'book';
    scene: string;
  }[];
}

export const ObjectDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [objectInfo, setObjectInfo] = useState<ObjectInfo | null>(null);
  const [isObjectInfoLoading, setIsObjectInfoLoading] = useState(false);

  const loadModel = async () => {
    try {
      setIsModelLoading(true);
      console.log('Loading TensorFlow.js and COCO-SSD model...');
      await tf.ready();
      const loadedModel = await cocossd.load();
      setModel(loadedModel);
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Failed to load model:', error);
    } finally {
      setIsModelLoading(false);
    }
  };

  const startVideo = useCallback(async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  }, []);

  const stopVideo = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const detectObjects = useCallback(async () => {
    if (!model || !videoRef.current || !canvasRef.current || !isDetecting) return;
    
    try {
      const predictions = await model.detect(videoRef.current);
      
      setDetections(predictions);
      
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Draw bounding boxes
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FF0000';
        ctx.fillStyle = 'white';
        ctx.font = '18px Arial';
        
        predictions.forEach(prediction => {
          const [x, y, width, height] = prediction.bbox;
          
          // Draw rectangle
          ctx.strokeRect(x, y, width, height);
          
          // Draw label background
          ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
          const textWidth = ctx.measureText(prediction.class).width;
          ctx.fillRect(x, y - 25, textWidth + 10, 25);
          
          // Draw label text
          ctx.fillStyle = 'white';
          ctx.fillText(prediction.class, x + 5, y - 8);
        });
      }
    } catch (error) {
      console.error('Error during object detection:', error);
    }
    
    // Continue detection loop
    requestAnimationFrame(detectObjects);
  }, [model, isDetecting]);

  const toggleDetection = () => {
    if (!isDetecting) {
      setIsDetecting(true);
    } else {
      setIsDetecting(false);
    }
  };

  const handleObjectClick = async (objectClass: string) => {
    setSelectedObject(objectClass);
    setIsObjectInfoLoading(true);
    
    try {
      const info = await fetchObjectInfo(objectClass);
      setObjectInfo(info);
    } catch (error) {
      console.error('Error fetching object info:', error);
    } finally {
      setIsObjectInfoLoading(false);
    }
  };

  useEffect(() => {
    loadModel();
    
    return () => {
      stopVideo();
    };
  }, [stopVideo]);

  useEffect(() => {
    if (isDetecting) {
      startVideo().then(() => {
        if (videoRef.current && canvasRef.current) {
          // Set canvas dimensions to match video
          canvasRef.current.width = videoRef.current.videoWidth || 640;
          canvasRef.current.height = videoRef.current.videoHeight || 480;
          detectObjects();
        }
      });
    } else {
      stopVideo();
    }
  }, [isDetecting, startVideo, stopVideo, detectObjects]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Object Detection</h2>
        <div className="flex gap-2">
          <Button 
            onClick={loadModel} 
            variant="outline" 
            size="sm" 
            disabled={isModelLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isModelLoading ? 'animate-spin' : ''}`} />
            Reload Model
          </Button>
          <Button 
            onClick={toggleDetection} 
            variant={isDetecting ? "destructive" : "default"} 
            size="sm"
            disabled={isModelLoading || !model}
          >
            {isDetecting ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {isDetecting ? 'Stop Detection' : 'Start Detection'}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative w-full lg:w-1/2 aspect-video bg-black rounded-md overflow-hidden">
          {isModelLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purrple mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading object detection model...</p>
              </div>
            </div>
          )}
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            autoPlay
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
          {!isDetecting && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Button 
                onClick={toggleDetection}
                disabled={isModelLoading || !model}
                variant="default"
              >
                <Eye className="h-4 w-4 mr-2" />
                Start Camera Detection
              </Button>
            </div>
          )}
        </div>
        
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="overflow-auto max-h-[200px] border rounded-md p-2">
            <h3 className="font-medium mb-2">Detected Objects</h3>
            {detections.length > 0 ? (
              <ul className="space-y-2">
                {detections.map((detection, index) => (
                  <li key={index}>
                    <Button 
                      variant={selectedObject === detection.class ? "default" : "outline"} 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => handleObjectClick(detection.class)}
                    >
                      {detection.class} ({Math.round(detection.score * 100)}%)
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                {isDetecting ? "No objects detected yet." : "Start detection to see objects."}
              </p>
            )}
          </div>
          
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Object Information</h3>
            {isObjectInfoLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : selectedObject ? (
              objectInfo ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-lg font-bold">{objectInfo.word}</h4>
                      {objectInfo.pronunciation && (
                        <span className="text-sm text-muted-foreground">/{objectInfo.pronunciation}/</span>
                      )}
                    </div>
                    <p className="text-sm">{objectInfo.meaning}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm">Example:</h5>
                    <p className="italic text-sm">{objectInfo.example}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm">Seen in:</h5>
                    <ul className="space-y-2">
                      {objectInfo.popCulture.map((reference, index) => (
                        <li key={index} className="border-l-2 border-purrple pl-3 py-1">
                          <p className="font-medium text-sm">
                            {reference.title} ({reference.type})
                          </p>
                          <p className="text-xs text-muted-foreground">{reference.scene}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No information available for this object.</p>
              )
            ) : (
              <p className="text-sm text-muted-foreground">Select a detected object to view information.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
