import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Palette, AlertTriangle, Check, Sun, Moon } from 'lucide-react';
import type { Settings as SettingsType } from '@/types';

interface SettingsProps {
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
  onReset: () => void;
}

export function Settings({ settings, setSettings, onReset }: SettingsProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [nameDraft, setNameDraft] = useState(settings.profileName);

  const handleSaveName = () => {
    setSettings((prev) => ({ ...prev, profileName: nameDraft || 'Learner' }));
  };

  const toggleTheme = () => {
    setSettings((prev) => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const handleReset = () => {
    onReset();
    setShowConfirm(false);
    setNameDraft('Learner');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">Manage your profile and bootcamp preferences.</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <User className="h-5 w-5 text-slate-400" />
              Profile
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <label className="block text-sm font-medium text-slate-700">Profile Name</label>
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              placeholder="Enter your name"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <Button onClick={handleSaveName}>
              <Check className="h-4 w-4" /> Save
            </Button>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            This name appears on your dashboard and progress reports.
          </p>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-slate-400" />
              Appearance
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Theme</p>
              <p className="mt-0.5 text-xs text-slate-400">
                Toggle between light and dark mode.
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                settings.theme === 'dark'
                  ? 'border-slate-700 bg-slate-800 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {settings.theme === 'dark' ? (
                <>
                  <Moon className="h-4 w-4" /> Dark
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" /> Light
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Reset Progress */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Reset All Progress</p>
              <p className="mt-0.5 text-xs text-slate-400">
                This will permanently clear all task completion, quiz scores, and settings.
              </p>
            </div>
            <Button variant="danger" onClick={() => setShowConfirm(true)}>
              Reset Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Reset all progress?</h3>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              This will permanently erase all your task completion, quiz scores, project progress,
              and settings. This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleReset}>
                Yes, reset everything
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
