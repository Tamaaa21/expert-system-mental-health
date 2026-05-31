'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart3, Users, TrendingUp, Loader } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';

type StatisticsData = {
  semester: number;
  totalDiagnoses: number;
  mildCount: number;
  moderateCount: number;
  severeCount: number;
  averageCF: number;
};

type AdminStats = {
  totalDiagnoses: number;
  semesterStats: StatisticsData[];
  severityDistribution: {
    Ringan: number;
    Sedang: number;
    Berat: number;
  };
  loading: boolean;
};

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats>({
    totalDiagnoses: 0,
    semesterStats: [],
    severityDistribution: { Ringan: 0, Sedang: 0, Berat: 0 },
    loading: true,
  });
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const isAuthed = localStorage.getItem('adminAuth') === 'true';
    if (!isAuthed) {
      router.replace('/admin/login');
      return;
    }
    setAuthChecked(true);
    fetchStatistics();
  }, [router]);

  async function fetchStatistics() {
    try {
      setStats((prev) => ({ ...prev, loading: true }));

      const { data: diagnosesData, error: diagnosesError } = await supabase
        .from('diagnoses')
        .select('semester, severity_level, total_cf');

      if (diagnosesError) throw diagnosesError;

      const semesterMap: Record<number, StatisticsData> = {};
      const severityMap: Record<string, number> = {
        Ringan: 0,
        Sedang: 0,
        Berat: 0,
      };

      diagnosesData.forEach((diagnosis: any) => {
        const sem = diagnosis.semester;
        if (!semesterMap[sem]) {
          semesterMap[sem] = {
            semester: sem,
            totalDiagnoses: 0,
            mildCount: 0,
            moderateCount: 0,
            severeCount: 0,
            averageCF: 0,
          };
        }

        semesterMap[sem].totalDiagnoses++;

        if (diagnosis.severity_level === 'Ringan') {
          semesterMap[sem].mildCount++;
          severityMap['Ringan']++;
        } else if (diagnosis.severity_level === 'Sedang') {
          semesterMap[sem].moderateCount++;
          severityMap['Sedang']++;
        } else if (diagnosis.severity_level === 'Berat') {
          semesterMap[sem].severeCount++;
          severityMap['Berat']++;
        }
      });

      const semesterStats = Object.values(semesterMap).sort(
        (a, b) => a.semester - b.semester
      );

      setStats({
        totalDiagnoses: diagnosesData.length,
        semesterStats,
        severityDistribution: {
          Ringan: severityMap['Ringan'] || 0,
          Sedang: severityMap['Sedang'] || 0,
          Berat: severityMap['Berat'] || 0,
        },
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  }

  if (!authChecked || stats.loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-12 h-12 text-red-900 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat statistik...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Statistik agregat diagnosis kesehatan mental mahasiswa
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('adminAuth');
                router.push('/admin/login');
              }}
              className="px-5 py-2 rounded-full border border-red-200 text-red-900 font-semibold hover:bg-red-50 transition-colors"
            >
              Keluar
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Diagnosis
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalDiagnoses}
                  </p>
                </div>
                <Users className="w-8 h-8 text-red-900 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Depresi Ringan
                  </p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {stats.severityDistribution.Ringan}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
              </div>
              {stats.totalDiagnoses > 0 && (
                <p className="text-xs text-gray-600 mt-2">
                  {Math.round(
                    (stats.severityDistribution.Ringan / stats.totalDiagnoses) *
                      100
                  )}
                  % dari total
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Depresi Sedang
                  </p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {stats.severityDistribution.Sedang}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-600 opacity-20" />
              </div>
              {stats.totalDiagnoses > 0 && (
                <p className="text-xs text-gray-600 mt-2">
                  {Math.round(
                    (stats.severityDistribution.Sedang / stats.totalDiagnoses) *
                      100
                  )}
                  % dari total
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Depresi Berat
                  </p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {stats.severityDistribution.Berat}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-600 opacity-20" />
              </div>
              {stats.totalDiagnoses > 0 && (
                <p className="text-xs text-gray-600 mt-2">
                  {Math.round(
                    (stats.severityDistribution.Berat / stats.totalDiagnoses) *
                      100
                  )}
                  % dari total
                </p>
              )}
            </div>
          </div>

          {/* Severity Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-red-900" />
              Distribusi Tingkat Keparahan
            </h2>

            {stats.totalDiagnoses > 0 ? (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">
                      Depresi Ringan
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {stats.severityDistribution.Ringan} (
                      {Math.round(
                        (stats.severityDistribution.Ringan / stats.totalDiagnoses) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                  <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 transition-all"
                      style={{
                        width: `${Math.round(
                          (stats.severityDistribution.Ringan / stats.totalDiagnoses) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">
                      Depresi Sedang
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {stats.severityDistribution.Sedang} (
                      {Math.round(
                        (stats.severityDistribution.Sedang / stats.totalDiagnoses) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                  <div className="h-3 bg-yellow-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-600 transition-all"
                      style={{
                        width: `${Math.round(
                          (stats.severityDistribution.Sedang / stats.totalDiagnoses) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">
                      Depresi Berat
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {stats.severityDistribution.Berat} (
                      {Math.round(
                        (stats.severityDistribution.Berat / stats.totalDiagnoses) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                  <div className="h-3 bg-red-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-600 transition-all"
                      style={{
                        width: `${Math.round(
                          (stats.severityDistribution.Berat / stats.totalDiagnoses) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                Belum ada data diagnosis
              </p>
            )}
          </div>

          {/* Semester Statistics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Statistik per Semester
            </h2>

            {stats.semesterStats.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        Semester
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">
                        Total
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">
                        Ringan
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">
                        Sedang
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">
                        Berat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.semesterStats.map((stat) => (
                      <tr key={stat.semester} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-900 font-medium">
                          Semester {stat.semester}
                          {stat.semester === 8 ? '+' : ''}
                        </td>
                        <td className="text-center py-3 px-4 text-gray-900 font-bold">
                          {stat.totalDiagnoses}
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="bg-green-100 text-green-900 px-3 py-1 rounded-full text-sm font-medium">
                            {stat.mildCount}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                            {stat.moderateCount}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="bg-red-100 text-red-900 px-3 py-1 rounded-full text-sm font-medium">
                            {stat.severeCount}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                Belum ada data diagnosis per semester
              </p>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-900 text-sm">
              <span className="font-semibold">Perhatian Privasi:</span> Dashboard
              ini hanya menampilkan statistik agregat tanpa informasi pribadi. Semua
              data diagnosis tersimpan secara anonim.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
