'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, MessageSquare, Calendar, Zap, CircleCheck as CheckCircle, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    id: 'webhook',
    label: 'Webhook',
    sublabel: 'New Lead',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.4)',
    Icon: Zap,
    log: 'Webhook triggered — new lead from website',
  },
  {
    id: 'ai',
    label: 'AI Agent',
    sublabel: 'Classifying...',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.4)',
    Icon: Bot,
    log: 'AI classified lead as HIGH priority',
  },
  {
    id: 'crm',
    label: 'CRM',
    sublabel: 'Saving contact',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.4)',
    Icon: User,
    log: 'Contact created in CRM (ID #4821)',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sublabel: 'Sending msg',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.4)',
    Icon: MessageSquare,
    log: 'WhatsApp message delivered ✓',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    sublabel: 'Booking slot',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    Icon: Calendar,
    log: 'Meeting booked for tomorrow 10:00',
  },
];

const CYCLE_DURATION = (STEPS.length * 1100) + 3200;

export function AutomationFlow() {
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [logs, setLogs] = useState<{ id: number; time: string; msg: string; color: string }[]>([]);
  const [running, setRunning] = useState(false);
  const [execCount, setExecCount] = useState(0);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      setActiveStep(-1);
      setCompletedSteps([]);
      setLogs([]);
      setRunning(true);

      STEPS.forEach((step, i) => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds() + i).padStart(2, '0')}`;

        const t1 = setTimeout(() => {
          setActiveStep(i);
          setLogs((prev) => [
            ...prev,
            { id: Date.now() + i, time: timeStr, msg: step.log, color: step.color },
          ]);
        }, i * 1100);

        const t2 = setTimeout(() => {
          setCompletedSteps((prev) => [...prev, i]);
          if (i === STEPS.length - 1) {
            const t3 = setTimeout(() => {
              const doneTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds() + STEPS.length).padStart(2, '0')}`;
              setLogs((prev) => [
                ...prev,
                { id: Date.now() + 99, time: doneTime, msg: `Workflow complete — ${STEPS.length} steps executed`, color: '#ec4899' },
              ]);
              setRunning(false);
              setActiveStep(-1);
              setExecCount((c) => c + 1);
            }, 900);
            timeouts.push(t3);
          }
        }, i * 1100 + 850);

        timeouts.push(t1, t2);
      });
    };

    const startDelay = setTimeout(runCycle, 400);
    const interval = setInterval(runCycle, CYCLE_DURATION);
    timeouts.push(startDelay);

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#080c14] overflow-hidden select-none">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.025]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[11px] font-mono text-gray-500">lead-automation.workflow</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-gray-600">
            #{String(execCount + 1).padStart(4, '0')}
          </span>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: running ? '#34d399' : '#6b7280' }}
              animate={running ? { opacity: [1, 0.2, 1], scale: [1, 1.3, 1] } : { opacity: 1 }}
              transition={{ duration: 0.7, repeat: running ? Infinity : 0 }}
            />
            <span
              className="text-[10px] font-semibold tracking-wider uppercase"
              style={{ color: running ? '#34d399' : '#6b7280' }}
            >
              {running ? 'Executing' : 'Idle'}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 pb-2">
        <div className="flex items-center gap-0">
          {STEPS.map((step, i) => {
            const isActive = activeStep === i;
            const isDone = completedSteps.includes(i);
            const { Icon } = step;

            return (
              <div key={step.id} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <motion.div
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-colors duration-300"
                    style={{
                      borderColor: isDone
                        ? step.color + 'cc'
                        : isActive
                        ? step.color + '99'
                        : 'rgba(255,255,255,0.07)',
                      backgroundColor: isDone
                        ? step.color + '25'
                        : isActive
                        ? step.color + '18'
                        : 'rgba(255,255,255,0.03)',
                    }}
                    animate={
                      isActive
                        ? {
                            boxShadow: [
                              `0 0 0px ${step.glow}`,
                              `0 0 22px ${step.glow}`,
                              `0 0 0px ${step.glow}`,
                            ],
                            scale: [1, 1.06, 1],
                          }
                        : isDone
                        ? { boxShadow: `0 0 10px ${step.glow.replace('0.4', '0.2')}` }
                        : { boxShadow: 'none', scale: 1 }
                    }
                    transition={{ duration: 0.65, repeat: isActive ? Infinity : 0 }}
                  >
                    <Icon
                      className="h-4 w-4 transition-colors duration-300"
                      style={{
                        color: isDone || isActive ? step.color : '#374151',
                      }}
                    />

                    <AnimatePresence>
                      {isDone && (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 border-[1.5px] border-[#080c14]"
                        >
                          <CheckCircle className="h-2.5 w-2.5 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ border: `2px solid ${step.color}` }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.55, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  <div className="text-center w-14">
                    <p
                      className="text-[10px] font-semibold leading-tight truncate"
                      style={{ color: isDone || isActive ? '#f9fafb' : '#6b7280' }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="text-[8.5px] leading-tight truncate transition-colors duration-300"
                      style={{ color: isDone || isActive ? step.color : '#374151' }}
                    >
                      {step.sublabel}
                    </p>
                  </div>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="relative flex-1 mx-1 flex items-center justify-center mb-6 h-px">
                    <div className="w-full h-px bg-white/[0.06]" />
                    <motion.div
                      className="absolute left-0 h-px origin-left"
                      style={{ backgroundColor: step.color, width: '100%' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isDone ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                    <AnimatePresence>
                      {activeStep === i + 1 && (
                        <motion.div
                          key="dot"
                          className="absolute h-2 w-2 rounded-full pointer-events-none"
                          style={{
                            backgroundColor: step.color,
                            boxShadow: `0 0 8px ${step.glow}`,
                          }}
                          initial={{ left: '0%', opacity: 0 }}
                          animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.55, ease: 'easeInOut' }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-4 mb-4 rounded-xl border border-white/[0.07] bg-black/50 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="flex gap-1">
            {[0, 1, 2].map((j) => (
              <motion.div
                key={j}
                className="h-1 w-1 rounded-full bg-gray-600"
                animate={running ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
                transition={{ duration: 0.9, repeat: running ? Infinity : 0, delay: j * 0.2 }}
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Execution Log</span>
          <div className="ml-auto text-[9px] font-mono text-gray-700">
            {logs.length}/{STEPS.length + 1} events
          </div>
        </div>

        <div className="px-3 py-2.5 space-y-1.5 min-h-[80px] max-h-[80px] overflow-hidden">
          <AnimatePresence initial={false}>
            {logs.slice(-4).map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2.5"
              >
                <span className="font-mono text-[9px] text-gray-700 flex-shrink-0 pt-px">
                  {line.time}
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <div
                    className="h-1 w-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: line.color }}
                  />
                  <span
                    className="font-mono text-[10px] leading-relaxed truncate"
                    style={{ color: line.color }}
                  >
                    {line.msg}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {logs.length === 0 && (
            <motion.p
              className="font-mono text-[10px] text-gray-700 italic pt-1"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              {'>'} Waiting for trigger event...
            </motion.p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: completedSteps.includes(i) ? 20 : activeStep === i ? 12 : 4,
                  backgroundColor:
                    completedSteps.includes(i) || activeStep === i ? step.color : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>
          <span className="text-[9px] text-gray-600 font-mono">
            {completedSteps.length}/{STEPS.length} nodes
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-600">
          <ArrowRight className="h-3 w-3" />
          <span>auto-restart</span>
        </div>
      </div>
    </div>
  );
}
