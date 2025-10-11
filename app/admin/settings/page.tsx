"use client";

import React, { useState, useEffect } from "react";
import { Save, Settings as SettingsIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [razorpaySettings, setRazorpaySettings] = useState({
    keyId: "",
    keySecret: "",
    webhookSecret: "",
  });
  const [gstSettings, setGstSettings] = useState({
    gstRate: "18",
    gstNumber: "",
    enableGst: false,
  });
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Axion Scientifics",
    siteEmail: "info@axionscientifics.com",
    sitePhone: "+91 XXX XXX XXXX",
    lowStockThreshold: "10",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        if (data.razorpay) setRazorpaySettings(data.razorpay);
        if (data.gst) setGstSettings(data.gst);
        if (data.general) setGeneralSettings(data.general);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay: razorpaySettings,
          gst: gstSettings,
          general: generalSettings,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3" />
          Settings
        </h1>
        <p className="text-gray-600">Configure payment gateway, taxes, and system settings</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-md">
          Settings saved successfully!
        </div>
      )}

      <div className="space-y-6 max-w-4xl">
        {/* Razorpay Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Razorpay Payment Gateway</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Razorpay Key ID"
              placeholder="rzp_live_xxxxxxxxxx"
              value={razorpaySettings.keyId}
              onChange={(e) =>
                setRazorpaySettings({ ...razorpaySettings, keyId: e.target.value })
              }
            />
            <Input
              label="Razorpay Key Secret"
              type="password"
              placeholder="Your Razorpay Key Secret"
              value={razorpaySettings.keySecret}
              onChange={(e) =>
                setRazorpaySettings({ ...razorpaySettings, keySecret: e.target.value })
              }
            />
            <Input
              label="Webhook Secret"
              type="password"
              placeholder="Razorpay Webhook Secret"
              value={razorpaySettings.webhookSecret}
              onChange={(e) =>
                setRazorpaySettings({ ...razorpaySettings, webhookSecret: e.target.value })
              }
            />
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> Get your Razorpay credentials from{" "}
                <a
                  href="https://dashboard.razorpay.com/app/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Razorpay Dashboard
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* GST Settings */}
        <Card>
          <CardHeader>
            <CardTitle>GST Tax Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableGst"
                checked={gstSettings.enableGst}
                onChange={(e) =>
                  setGstSettings({ ...gstSettings, enableGst: e.target.checked })
                }
                className="w-4 h-4 text-primary-600 rounded"
              />
              <label htmlFor="enableGst" className="text-sm font-medium">
                Enable GST on all products
              </label>
            </div>

            {gstSettings.enableGst && (
              <>
                <Input
                  label="GST Rate (%)"
                  type="number"
                  placeholder="18"
                  value={gstSettings.gstRate}
                  onChange={(e) =>
                    setGstSettings({ ...gstSettings, gstRate: e.target.value })
                  }
                />
                <Input
                  label="GST Number (GSTIN)"
                  placeholder="22AAAAA0000A1Z5"
                  value={gstSettings.gstNumber}
                  onChange={(e) =>
                    setGstSettings({ ...gstSettings, gstNumber: e.target.value })
                  }
                />
              </>
            )}
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Site Name"
              placeholder="Axion Scientifics"
              value={generalSettings.siteName}
              onChange={(e) =>
                setGeneralSettings({ ...generalSettings, siteName: e.target.value })
              }
            />
            <Input
              label="Contact Email"
              type="email"
              placeholder="info@axionscientifics.com"
              value={generalSettings.siteEmail}
              onChange={(e) =>
                setGeneralSettings({ ...generalSettings, siteEmail: e.target.value })
              }
            />
            <Input
              label="Contact Phone"
              placeholder="+91 XXX XXX XXXX"
              value={generalSettings.sitePhone}
              onChange={(e) =>
                setGeneralSettings({ ...generalSettings, sitePhone: e.target.value })
              }
            />
            <Input
              label="Default Low Stock Threshold"
              type="number"
              placeholder="10"
              value={generalSettings.lowStockThreshold}
              onChange={(e) =>
                setGeneralSettings({ ...generalSettings, lowStockThreshold: e.target.value })
              }
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSaveSettings}
            disabled={loading}
          >
            <Save className="w-5 h-5 mr-2" />
            {loading ? "Saving..." : "Save All Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}

