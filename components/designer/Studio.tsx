'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import DesignCanvas from './Canvas/DesignCanvas'
import MainToolbar from './Toolbar/MainToolbar'
import ElementsPanel from './Sidebar/ElementsPanel'
import PropertiesPanel from './Sidebar/PropertiesPanel'
import LayersPanel from './Sidebar/LayersPanel'
import CanvasSettings from './Sidebar/CanvasSettings'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Layers, Box, Settings, Palette, Menu, X, Home, Library } from 'lucide-react'

export default function Studio() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [leftTab, setLeftTab] = useState<'elements' | 'templates'>('elements')
  const [rightTab, setRightTab] = useState<'properties' | 'layers' | 'canvas'>('properties')
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setLeftSidebarOpen(false)
        setRightSidebarOpen(false)
      } else {
        setLeftSidebarOpen(true)
        setRightSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const canvasWidth = isMobile ? 350 : 800
  const canvasHeight = isMobile ? 500 : 600

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-medium text-sm">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link href="/library" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-medium text-sm">
            <Library className="w-4 h-4" />
            <span className="hidden sm:inline">My Labels</span>
          </Link>
        </div>
        <div className="text-sm font-semibold text-gray-800">✨ Studio</div>
      </div>

      {/* Toolbar */}
      <MainToolbar />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop: Left Sidebar */}
        {!isMobile && (
          <>
            <AnimatePresence>
              {leftSidebarOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="bg-white border-r border-gray-200 overflow-hidden flex flex-col"
                >
                  {/* Tab Selector */}
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setLeftTab('elements')}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                        leftTab === 'elements'
                          ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Box className="w-4 h-4" />
                        Elements
                      </div>
                    </button>
                    <button
                      onClick={() => setLeftTab('templates')}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                        leftTab === 'templates'
                          ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Layers className="w-4 h-4" />
                        Templates
                      </div>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto">
                    {leftTab === 'elements' && <ElementsPanel />}
                    {leftTab === 'templates' && (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        Templates coming soon
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Button for Left Sidebar */}
            <button
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-r-lg p-2 hover:bg-gray-50 transition shadow-md"
              style={{ left: leftSidebarOpen ? '280px' : '0px' }}
            >
              {leftSidebarOpen ? (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </>
        )}

        {/* Canvas Area */}
        <div className={`flex-1 flex items-center justify-center overflow-auto ${isMobile ? 'p-2' : 'p-8'}`}>
          <DesignCanvas width={canvasWidth} height={canvasHeight} />
        </div>

        {/* Desktop: Right Sidebar */}
        {!isMobile && (
          <>
            {/* Toggle Button for Right Sidebar */}
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-l-lg p-2 hover:bg-gray-50 transition shadow-md"
              style={{ right: rightSidebarOpen ? '320px' : '0px' }}
            >
              {rightSidebarOpen ? (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              )}
            </button>

            {/* Right Sidebar - Properties & Layers */}
            <AnimatePresence>
              {rightSidebarOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="bg-white border-l border-gray-200 overflow-hidden flex flex-col"
                >
                  {/* Tab Selector */}
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setRightTab('properties')}
                      className={`flex-1 px-3 py-3 text-xs font-medium transition ${
                        rightTab === 'properties'
                          ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <Settings className="w-3.5 h-3.5" />
                        Props
                      </div>
                    </button>
                    <button
                      onClick={() => setRightTab('layers')}
                      className={`flex-1 px-3 py-3 text-xs font-medium transition ${
                        rightTab === 'layers'
                          ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        Layers
                      </div>
                    </button>
                    <button
                      onClick={() => setRightTab('canvas')}
                      className={`flex-1 px-3 py-3 text-xs font-medium transition ${
                        rightTab === 'canvas'
                          ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <Palette className="w-3.5 h-3.5" />
                        Canvas
                      </div>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto">
                    {rightTab === 'properties' && <PropertiesPanel />}
                    {rightTab === 'layers' && <LayersPanel />}
                    {rightTab === 'canvas' && <CanvasSettings />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Mobile: Floating Action Button */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}

        {/* Mobile: Bottom Sheet Menu */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40"
              />

              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col"
              >
                {/* Handle */}
                <div className="flex justify-center py-3">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Tab Selector */}
                <div className="flex border-b border-gray-200 px-4">
                  <button
                    onClick={() => setLeftTab('elements')}
                    className={`flex-1 py-4 text-sm font-medium transition ${
                      leftTab === 'elements'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Box className="w-5 h-5" />
                      Elements
                    </div>
                  </button>
                  <button
                    onClick={() => setRightTab('properties')}
                    className={`flex-1 py-4 text-sm font-medium transition ${
                      rightTab === 'properties' && leftTab !== 'elements'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Settings className="w-5 h-5" />
                      Properties
                    </div>
                  </button>
                  <button
                    onClick={() => setRightTab('layers')}
                    className={`flex-1 py-4 text-sm font-medium transition ${
                      rightTab === 'layers' && leftTab !== 'elements'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Layers className="w-5 h-5" />
                      Layers
                    </div>
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {leftTab === 'elements' && <ElementsPanel />}
                  {leftTab !== 'elements' && rightTab === 'properties' && <PropertiesPanel />}
                  {leftTab !== 'elements' && rightTab === 'layers' && <LayersPanel />}
                  {leftTab !== 'elements' && rightTab === 'canvas' && <CanvasSettings />}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
