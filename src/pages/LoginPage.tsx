import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Smartphone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const inputCls =
  'w-full h-[50px] pl-11 pr-4 bg-[#FAFAFA] border border-[#EAECF0] rounded-2xl text-[13px] ' +
  'text-[#101828] placeholder-[#B0B8C8] outline-none transition-all ' +
  'focus:bg-white focus:border-[var(--primary-brand)] focus:ring-2 focus:ring-[var(--primary-brand)]/10';

const labelCls = 'block text-[12px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2';

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C0C7D4] pointer-events-none">
    {children}
  </span>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    otp: '',
    countryCode: '+65',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden"
      style={{ background: 'var(--app-canvas, #f4f6fb)' }}>

      {/* Background bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {([
          { cls: 'from-[#dde8ff] to-[#efe4ff] -top-[120px] -left-[120px] w-[420px] h-[420px]', dur: '26s', delay: '0s' },
          { cls: 'from-[#d4eaff] to-[#e2f5ff] top-[15%] -right-[100px] w-[340px] h-[340px]',  dur: '19s', delay: '-4s' },
          { cls: 'from-[#fde8d8] to-[#fef0e6] -bottom-[80px] left-[12%] w-[300px] h-[300px]', dur: '23s', delay: '-6s' },
          { cls: 'from-[#e0f7e9] to-[#d1fae5] bottom-[8%] right-[18%] w-[270px] h-[270px]',   dur: '21s', delay: '-9s' },
          { cls: 'from-[#fce4f3] to-[#f5d0fe] top-[48%] left-[4%] w-[310px] h-[310px]',        dur: '25s', delay: '-3s' },
        ] as const).map((b, i) => (
          <div key={i}
            className={`absolute rounded-full blur-3xl opacity-55 animate-float bg-gradient-to-br ${b.cls}`}
            style={{ '--float-duration': b.dur, animationDelay: b.delay } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main card */}
      <div className="relative z-10 flex w-full max-w-[1000px] bg-white rounded-[36px] shadow-2xl overflow-hidden"
        style={{ minHeight: 580 }}>

        {/* Left branding panel */}
        <div className="hidden md:flex flex-col justify-center flex-[4] relative overflow-hidden p-12"
          style={{
            backgroundImage: 'url(/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>

          {/* Base dim so photo isn't too bright */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'rgba(0,0,0,0.18)' }} />

          {/* Gradient: bottom-left rich blue → top-right transparent */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top right, rgba(10,30,90,0.90) 0%, rgba(20,50,130,0.55) 40%, transparent 72%)' }} />

          {/* Centered content block */}
          <div className="relative z-10 flex flex-col gap-8">

            {/* Logo + wordmark */}
            {/* <div className="flex items-center gap-3">
              <img src="/logo_with_background.png" alt="S-Plus" className="h-11 w-11 rounded-xl object-cover shadow-md" />
              <span className="text-[18px] font-bold tracking-tight text-white">S-Plus</span>
            </div> */}

            {/* Headline */}
            <div>
              <h1 className="text-[34px] font-bold leading-[1.15]"
                style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}>
                Enterprise<br />Management<br />Made Simple
              </h1>
              <p className="mt-4 text-[13px] leading-relaxed max-w-[210px]"
                style={{ color: 'rgba(255,255,255,0.80)', textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
                One platform for your workforce, operations, and finances.
              </p>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {['HR & Payroll', 'Operations', 'Finance', 'Analytics', 'Attendance'].map(f => (
                <span key={f} className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.80)', border: '1px solid rgba(255,255,255,0.18)' }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-[5] flex items-center justify-center px-10 py-12">
          <div className="w-full max-w-[340px]">

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img src="/logo.png" alt="S-Plus" className="h-[64px] w-auto" />
            </div>

            {/* Tabs */}
            <div className="flex rounded-2xl p-1 mb-7" style={{ background: '#F3F4F6' }}>
              {(['email', 'mobile'] as const).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setLoginMethod(method)}
                  className="relative flex-1 py-2 text-[13px] font-semibold rounded-xl transition-colors"
                  style={{ color: loginMethod === method ? '#101828' : '#9CA3AF' }}
                >
                  {loginMethod === method && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-xl bg-white shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{method === 'email' ? 'Email' : 'Mobile'}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ minHeight: 180 }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={loginMethod}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="space-y-4"
                  >
                    {loginMethod === 'email' ? (
                      <>
                        {/* Email */}
                        <div>
                          <label className={labelCls}>Email or Username</label>
                          <div className="relative">
                            <IconWrap><Mail size={16} /></IconWrap>
                            <input
                              type="text"
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                              className={inputCls}
                              placeholder="you@company.com"
                            />
                          </div>
                        </div>

                        {/* OTP */}
                        <div>
                          <label className={labelCls}>One-Time Password</label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <IconWrap><Smartphone size={16} /></IconWrap>
                              <input
                                type="text"
                                value={formData.otp}
                                onChange={e => setFormData({ ...formData, otp: e.target.value })}
                                className={inputCls}
                                placeholder="Enter OTP"
                              />
                            </div>
                            <button type="button" className="otp-btn">
                              Get OTP
                            </button>
                          </div>
                          <p className="text-[11px] text-[#B0B8C8] mt-2">OTP will be sent to your registered email.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Mobile */}
                        <div>
                          <label className={labelCls}>Mobile Number</label>
                          <div className="flex gap-2">
                            <select
                              value={formData.countryCode}
                              onChange={e => setFormData({ ...formData, countryCode: e.target.value })}
                              className="h-[50px] w-[82px] flex-shrink-0 bg-[#FAFAFA] border border-[#EAECF0] rounded-2xl px-2 text-[13px] text-[#101828] outline-none focus:border-[var(--primary-brand)]"
                            >
                              <option value="+65">+65</option>
                              <option value="+91">+91</option>
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                            </select>
                            <div className="relative flex-1">
                              <IconWrap><Phone size={16} /></IconWrap>
                              <input
                                type="text"
                                value={formData.mobile}
                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                className={inputCls}
                                placeholder="Mobile number"
                              />
                            </div>
                          </div>
                        </div>

                        {/* OTP */}
                        <div>
                          <label className={labelCls}>One-Time Password</label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <IconWrap><Smartphone size={16} /></IconWrap>
                              <input
                                type="text"
                                value={formData.otp}
                                onChange={e => setFormData({ ...formData, otp: e.target.value })}
                                className={inputCls}
                                placeholder="Enter OTP"
                              />
                            </div>
                            <button type="button" className="otp-btn">
                              Get OTP
                            </button>
                          </div>
                          <p className="text-[11px] text-[#B0B8C8] mt-2">OTP will be sent to your registered mobile number.</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Submit */}
              <button type="submit" className="login-sign-in-btn mt-6 flex items-center justify-center gap-2">
                <span>Sign In</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* reCAPTCHA v3 badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white shadow-md">
          <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M32 4L8 14v18c0 13.3 10.3 25.7 24 29 13.7-3.3 24-15.7 24-29V14L32 4z" fill="#4A90D9"/>
            <path d="M32 4L56 14v18c0 13.3-10.3 25.7-24 29V4z" fill="#357ABD"/>
            <text x="32" y="41" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif">G</text>
          </svg>
          <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: '#3c4043', letterSpacing: '0.01em' }}>reCAPTCHA</div>
            <div style={{ fontSize: 9, color: '#9AA0A6', marginTop: 2 }}>
              <a href="#" className="hover:underline">Privacy</a>{' · '}<a href="#" className="hover:underline">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
