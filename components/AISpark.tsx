
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Loader2, RefreshCw, Star } from 'lucide-react';
import { AIProject, ActivatorData } from '../types';

interface AISparkProps {
  setActivator: React.Dispatch<React.SetStateAction<ActivatorData>>;
}

const AISpark: React.FC<AISparkProps> = ({ setActivator }) => {
  const [project, setProject] = useState<AIProject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateProject = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a creative makerspace project idea. Return instructions as a numbered list inside the description or a separate instructions field.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              materials: { type: Type.ARRAY, items: { type: Type.STRING } },
              difficulty: { type: Type.STRING },
              vibe: { type: Type.STRING }
            },
            required: ["title", "description", "materials", "difficulty", "vibe"]
          }
        },
      });

      const data = JSON.parse(response.text.trim());
      const newProject = { ...data, timestamp: new Date().setHours(0,0,0,0) };
      setProject(newProject);
      localStorage.setItem('makerspace_daily_spark', JSON.stringify(newProject));
    } catch (err) {
      console.error(err);
      setError("Failed to spark an idea.");
    } finally {
      setIsLoading(false);
    }
  };

  const promoteToActivator = () => {
    if (!project) return;
    setActivator({
      title: project.title,
      description: project.description,
      materials: project.materials,
      instructions: ["Step 1: Gather materials", "Step 2: Prototype design", "Step 3: Refine and build"],
      imageUrl: "https://images.unsplash.com/photo-1513364238782-bc04803b0704?auto=format&fit=crop&q=80&w=800",
      difficulty: project.difficulty,
      month: new Date().toLocaleString('default', { month: 'long' })
    });
    alert("Project promoted to Monthly Activator!");
  };

  useEffect(() => {
    const saved = localStorage.getItem('makerspace_daily_spark');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.timestamp === new Date().setHours(0,0,0,0)) {
        setProject(parsed);
        return;
      }
    }
    generateProject();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <h3 className="text-lg font-bold text-slate-800">Mixing ideas...</h3>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col group relative overflow-hidden transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Sparkles size={20} /></div>
        <h2 className="font-bold text-lg text-slate-800">Daily Spark</h2>
      </div>

      {project && (
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{project.title}</h3>
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">{project.description}</p>
          <div className="mt-auto space-y-3">
             <button 
                onClick={promoteToActivator}
                className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 transition-all"
              >
                <Star size={14} /> Promote to Monthly
              </button>
             <button 
                onClick={generateProject}
                className="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
              >
                <RefreshCw size={14} /> Re-roll
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISpark;
