"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  Search, 
  Download, 
  RefreshCw, 
  Save, 
  LogOut,
  Settings,
  Package,
  TrendingUp,
  FileText
} from "lucide-react";
import pricingData from "@/data/pricing.json";
import brandsData from "@/data/brands.json";

interface PricingData {
  repairs: {
    [key: string]: {
      basePrice: number;
      devices: {
        [key: string]: any;
      };
    };
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pricing, setPricing] = useState<PricingData>(pricingData as PricingData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepair, setSelectedRepair] = useState<string>("");
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Check authentication
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    const loginTime = sessionStorage.getItem("admin_login_time");
    
    if (!auth || !loginTime) {
      router.push("/admin");
      return;
    }

    // Check if session is expired (24 hours)
    const timeDiff = Date.now() - parseInt(loginTime);
    if (timeDiff > 24 * 60 * 60 * 1000) {
      sessionStorage.removeItem("admin_authenticated");
      sessionStorage.removeItem("admin_login_time");
      router.push("/admin");
      return;
    }

    setIsAuthenticated(true);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_login_time");
    router.push("/admin");
  };

  const updatePrice = (
    repairType: string,
    deviceId: string,
    field: string,
    value: number | string,
    subType?: string
  ) => {
    setPricing((prev) => {
      const newPricing = JSON.parse(JSON.stringify(prev));
      
      if (subType) {
        // For battery (original/regular), camera (lens/replacement), etc.
        if (!newPricing.repairs[repairType].devices[deviceId]) {
          newPricing.repairs[repairType].devices[deviceId] = {};
        }
        if (!newPricing.repairs[repairType].devices[deviceId][subType]) {
          newPricing.repairs[repairType].devices[deviceId][subType] = {};
        }
        newPricing.repairs[repairType].devices[deviceId][subType][field] = value;
      } else {
        // Direct device pricing
        if (!newPricing.repairs[repairType].devices[deviceId]) {
          newPricing.repairs[repairType].devices[deviceId] = {};
        }
        newPricing.repairs[repairType].devices[deviceId][field] = value;
      }
      
      setHasChanges(true);
      return newPricing;
    });
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(pricing, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pricing.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all changes?")) {
      setPricing(pricingData as PricingData);
      setHasChanges(false);
    }
  };

  // Get all repair types
  const repairTypes = Object.keys(pricing.repairs);

  // Get all devices from brands
  const allDevices = brandsData.brands.flatMap((brand) =>
    brand.models.map((model) => ({
      id: model.id,
      name: model.name,
      brand: brand.name,
    }))
  );

  // Filter devices based on search
  const filteredDevices = allDevices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-neutral-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-neutral-600 mt-1">
                Manage product prices and settings
              </p>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <span className="text-sm text-amber-600 font-medium">
                  Unsaved changes
                </span>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:text-primary-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Repair Types</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {repairTypes.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-primary-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Total Devices</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {allDevices.length}
                </p>
              </div>
              <Settings className="w-8 h-8 text-accent-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Pricing Entries</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {Object.values(pricing.repairs).reduce(
                    (acc, repair) => acc + Object.keys(repair.devices).length,
                    0
                  )}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Status</p>
                <p className="text-lg font-bold text-neutral-900">
                  {hasChanges ? "Modified" : "Saved"}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              />
            </div>
            <select
              value={selectedRepair}
              onChange={(e) => setSelectedRepair(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            >
              <option value="">All Repair Types</option>
              {repairTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " ")}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download JSON
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Editor */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-xl font-display font-bold text-neutral-900">
              Price Management
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Edit prices for devices and repair types. Changes will be saved to pricing.json
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {repairTypes
                .filter((type) => !selectedRepair || type === selectedRepair)
                .map((repairType) => (
                  <div key={repairType} className="border border-neutral-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 capitalize">
                      {repairType.replace(/-/g, " ")}
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(pricing.repairs[repairType].devices)
                        .filter(([deviceId]) => {
                          if (!searchTerm) return true;
                          const device = allDevices.find((d) => d.id === deviceId);
                          return device?.name.toLowerCase().includes(searchTerm.toLowerCase());
                        })
                        .map(([deviceId, deviceData]) => {
                          const device = allDevices.find((d) => d.id === deviceId);
                          return (
                            <div
                              key={deviceId}
                              className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
                            >
                              <h4 className="font-semibold text-neutral-900 mb-3">
                                {device?.name || deviceId}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {typeof deviceData === "object" && !Array.isArray(deviceData) ? (
                                  // Handle nested structures (battery, camera, etc.)
                                  Object.entries(deviceData).map(([key, value]) => {
                                    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                                      // Sub-type (original/regular, lens/replacement, etc.)
                                      return (
                                        <div key={key} className="space-y-2">
                                          <label className="text-sm font-medium text-neutral-700 capitalize">
                                            {key.replace(/-/g, " ")}
                                          </label>
                                          {Object.entries(value as Record<string, any>).map(([field, fieldValue]) => (
                                            <div key={field}>
                                              <input
                                                type={field === "price" ? "number" : "text"}
                                                value={fieldValue}
                                                onChange={(e) =>
                                                  updatePrice(
                                                    repairType,
                                                    deviceId,
                                                    field,
                                                    field === "price" ? parseFloat(e.target.value) || 0 : e.target.value,
                                                    key
                                                  )
                                                }
                                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-sm"
                                                placeholder={field}
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      );
                                    } else {
                                      // Direct field
                                      return (
                                        <div key={key}>
                                          <label className="block text-sm font-medium text-neutral-700 mb-1 capitalize">
                                            {key.replace(/-/g, " ")}
                                          </label>
                                          <input
                                            type={key === "price" || key === "save" ? "number" : "text"}
                                            value={value as string | number}
                                            onChange={(e) =>
                                              updatePrice(
                                                repairType,
                                                deviceId,
                                                key,
                                                key === "price" || key === "save"
                                                  ? parseFloat(e.target.value) || 0
                                                  : e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-sm"
                                          />
                                        </div>
                                      );
                                    }
                                  })
                                ) : (
                                  // Simple value
                                  <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                                      Price
                                    </label>
                                    <input
                                      type="number"
                                      value={deviceData as number}
                                      onChange={(e) =>
                                        updatePrice(
                                          repairType,
                                          deviceId,
                                          "price",
                                          parseFloat(e.target.value) || 0
                                        )
                                      }
                                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-sm"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">📝 Instructions</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
            <li>Edit prices directly in the fields above</li>
            <li>Click "Download JSON" to save the updated pricing.json file</li>
            <li>Replace the file in <code className="bg-blue-100 px-1 rounded">data/pricing.json</code></li>
            <li>Commit and push the changes to update the website</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

