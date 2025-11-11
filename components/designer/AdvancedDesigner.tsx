'use client'

import React, { useState } from 'react'
import DesignCanvas from './Canvas/DesignCanvas'
import MainToolbar from './Toolbar/MainToolbar'
import ElementsPanel from './Sidebar/ElementsPanel'
import PropertiesPanel from './Sidebar/PropertiesPanel'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Layers, Box } from 'lucide-react'

export default function AdvancedDesigner() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [leftTab, setLeftTab] = useState<'elements' | 'templates'>('elements')

  const canvasWidth = 800
  const canvasHeight = 600

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Toolbar */}
      <MainToolbar />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
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

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <DesignCanvas width={canvasWidth} height={canvasHeight} />
        </div>

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

        {/* Right Sidebar - Properties Panel */}
        <AnimatePresence>
          {rightSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white border-l border-gray-200 overflow-hidden"
            >
              <div className="h-full overflow-y-auto">
                <PropertiesPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
