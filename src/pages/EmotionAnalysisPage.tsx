import { useLocation, useNavigate } from 'react-router-dom';
import { Info, BarChart2, FileText, PieChartIcon } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type EmotionKey = 'happiness' | 'calm' | 'excitement' | 'neutral' | 'angry' | 'disgust' | 'sad';
type Emotions = {
  happy: number;
  calm: number;
  fearful: number;
  neutral: number;
  angry: number;
  disgust: number;
  sad: number;
  [key: string]: number;
};

type AnalysisResult = {
  confidence_level: string;
  confidence_score: number;
  emotions: Emotions;
};

const EmotionAnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisResult } = (location.state || {}) as { analysisResult: AnalysisResult };

  const { confidence_level, confidence_score, emotions } = analysisResult || {
    confidence_level: 'N/A',
    confidence_score: 0,
    emotions: {
      happy: 0,
      calm: 0,
      fearful: 0,
      neutral: 0,
      angry: 0,
      disgust: 0,
      sad: 0,
    },
  };

  const emotionPercentages = {
    happiness: emotions.happy,
    calm: emotions.calm,
    excitement: emotions.fearful,
    neutral: emotions.neutral,
    angry: emotions.angry,
    disgust: emotions.disgust,
    sad: emotions.sad,
  };

  const emotionColors: Record<EmotionKey, string> = {
    happiness: '#FBBF24',
    calm: '#34D399',
    excitement: '#F59E0B',
    neutral: '#9CA3AF',
    angry: '#EF4444',
    disgust: '#8B5CF6',
    sad: '#60A5FA',
  };

  const data = Object.entries(emotionPercentages).map(([name, value]) => ({
    name,
    value,
    fill: emotionColors[name as keyof typeof emotionColors],
  }));

  const sortedEmotions = Object.entries(emotions).sort((a, b) => b[1] - a[1]);
  const primaryEmotion = sortedEmotions[0][0] as keyof Emotions;
  const secondaryEmotion = sortedEmotions[1][0] as keyof Emotions;
  const tertiaryEmotion = sortedEmotions[2][0] as keyof Emotions;

  const confidenceTips = confidence_score < 50 ? (
    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 shadow-sm">
      <h4 className="text-lg font-semibold text-yellow-700 mb-2">Tips to Improve Confidence</h4>
      <ul className="list-disc list-inside text-yellow-700">
        <li>Practice speaking in front of a mirror to observe your body language.</li>
        <li>Record yourself speaking and review the recordings to identify areas for improvement.</li>
        <li>Engage in public speaking workshops or join a local Toastmasters club.</li>
        <li>Focus on deep breathing exercises to reduce anxiety before speaking.</li>
        <li>Start with smaller audiences and gradually increase the size as you gain confidence.</li>
      </ul>
    </div>
  ) : (
    <div className="bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
      <h4 className="text-lg font-semibold text-green-700 mb-2">Great Job!</h4>
      <p className="text-green-700">
        Your confidence score is high, indicating that you are ready for public speaking. Keep up the good work and continue to refine your skills.
      </p>
    </div>
  );

  // Function to handle PDF export
  const handleExportReport = () => {
    const input = document.getElementById('emotion-analysis-page'); // Ensure the entire page is captured
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 page width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('emotion-analysis-report.pdf');
      });
    }
  };

  // Function to handle navigation to homepage
  const handleCompleteAnalysis = () => {
    navigate('/'); // Navigate to the homepage
  };

  return (
    <section id="emotion-analysis-page" className="py-20 bg-white pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Emotion Analysis</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Powerful visualization tools to help you understand emotional patterns in speech.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-gray-100 max-w-5xl mx-auto">
          {/* Analysis Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 border-b border-gray-200">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-500 focus:outline-none">
                Dashboard
              </button>
            </div>
          </div>

          {/* Confidence Score and Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-neutral-50 p-6 rounded-2xl border border-gray-100 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-500" />
                Confidence Score
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#confidence-gradient)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (Math.min(Math.max(confidence_score, 0), 100) * 2.83)}
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient id="confidence-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{(confidence_score).toFixed(2)}%</div>
                      <div className="text-sm text-gray-500">Confidence</div>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600 text-sm text-center">
                  Confidence level: <span className="font-semibold">{confidence_level}</span>
                </p>
              </div>
            </div>

            <div className="md:col-span-2 bg-neutral-50 p-6 rounded-2xl border border-gray-100 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                Emotion Summary
              </h3>
              <div className="mb-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-neutral-700 text-lg leading-relaxed">
                  The speaker is primarily expressing{' '}
                  <span className="font-semibold text-blue-600">
                    {primaryEmotion} ({emotions[primaryEmotion].toFixed(2)}%)
                  </span>
                  , with underlying tones of{' '}
                  <span className="font-semibold text-green-500">
                    {secondaryEmotion} ({emotions[secondaryEmotion].toFixed(2)}%)
                  </span>
                  . There are minimal traces of{' '}
                  <span className="font-semibold text-neutral-500">
                    {tertiaryEmotion} ({emotions[tertiaryEmotion].toFixed(2)}%)
                  </span>{' '}
                  expression.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <div className="text-sm">
                    <span className="font-medium">Primary emotion:</span>
                    <span className="text-blue-600 font-semibold ml-1 capitalize">
                      {primaryEmotion}
                    </span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-sm">
                    <span className="font-medium">Secondary emotion:</span>
                    <span className="text-green-600 font-semibold ml-1 capitalize">
                      {secondaryEmotion}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 flex items-center col-span-2">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <div className="text-sm text-neutral-600">
                    Voice tone indicates a strong {primaryEmotion} emotional state.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                Emotion Distribution
              </h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
                    <YAxis tick={{ fill: '#4B5563' }} />
                    <Tooltip />
                    <Bar dataKey="value" barSize={40} radius={[8, 8, 0, 0]}>
                      {data.map((entry, index) => (
                        <rect key={`bar-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                Emotion Breakdown
              </h3>
              <div className="flex justify-center items-center h-64">
                <div className="w-60 h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={emotionColors[entry.name as EmotionKey] || "#3B82F6"} />
                        ))}
                      </Pie>
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-lg font-semibold text-blue-600">
                        {primaryEmotion}
                      </text>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="ml-8">
                  {data.map(({ name, value }) => (
                    <div key={name} className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: emotionColors[name as EmotionKey] }}></div>
                      <div className="text-sm text-neutral-600">
                        <span className="font-medium capitalize">{name}</span>
                        <span className="text-blue-600 font-semibold ml-1">{value.toFixed(2)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Emotion Summary & Confidence Tips */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-500" />
              Detailed Emotion Summary & Confidence Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-neutral-700 mb-2">Emotion Insights</h4>
                <ul className="list-disc list-inside text-neutral-700">
                  <li>The primary emotion detected is <strong>{primaryEmotion}</strong>, which is strongly influencing the overall tone.</li>
                  <li>The secondary emotion, <strong>{secondaryEmotion}</strong>, adds depth to the emotional expression.</li>
                  <li>Traces of <strong>{tertiaryEmotion}</strong> are also present, contributing to the complexity of the emotional state.</li>
                </ul>
              </div>
              {confidenceTips}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
            <div>
              <button
                onClick={handleExportReport}
                className="px-5 py-2 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Export Report
              </button>
            </div>
            <div className="flex gap-2">
              {/* <button className="px-5 py-2 bg-neutral-100 text-neutral-600 font-medium rounded-full hover:bg-neutral-200 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Save Analysis
              </button> */}
              <button
                onClick={handleCompleteAnalysis}
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complete Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmotionAnalysisPage;