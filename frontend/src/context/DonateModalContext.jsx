import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DonateModalContext = createContext(null);

/**
 * Global Donate Modal Context for ZINMATT Foundation
 * Allows any component or CTA across the site to trigger the donation modal,
 * optionally pre-selecting a cause, frequency, or amount.
 */
export function DonateModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState({
    cause: 'General Fund',
    amount: 1200,
    frequency: 'one-time',
  });

  const openDonateModal = useCallback((options = {}) => {
    setModalOptions({
      cause: options.cause || 'General Fund',
      amount: options.amount || 1200,
      frequency: options.frequency || 'one-time',
    });
    setIsOpen(true);
  }, []);

  const closeDonateModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeDonateModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDonateModal]);

  return (
    <DonateModalContext.Provider
      value={{
        isOpen,
        openDonateModal,
        closeDonateModal,
        modalOptions,
      }}
    >
      {children}
    </DonateModalContext.Provider>
  );
}

export function useDonateModal() {
  const context = useContext(DonateModalContext);
  if (!context) {
    throw new Error('useDonateModal must be used within a DonateModalProvider');
  }
  return context;
}
