import React, { useRef, useEffect } from "react";

interface ModalProps {
  options: { code: string; name: string; market_name: string }[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: {
    code: string;
    name: string;
    market_name: string;
  }) => void;
  searchTerm: string;
  loadMore: () => void;
}

const Modal: React.FC<ModalProps> = ({
  options,
  isOpen,
  onClose,
  onSelect,
  searchTerm,
  loadMore,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          loadMore();
        }
      }
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMore]);

  const handleSelect = (option: {
    code: string;
    name: string;
    market_name: string;
  }) => {
    onSelect(option);
    onClose();
  };

  if (!isOpen || !searchTerm) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50"
      style={{ width: "100%" }}
    >
      {options.length > 0 ? (
        options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(option)}
            className="flex items-center p-2 cursor-pointer hover:bg-slate-200"
          >
            <div className="text-md mr-2">{option.name}</div>
            <div className="text-sm text-gray-500 border rounded-full px-3 py-1 inline-block mr-2">
              {option.code}
            </div>
            <div className="text-sm text-gray-500 border rounded-full px-3 py-1 inline-block">
              {option.market_name}
            </div>
          </div>
        ))
      ) : (
        <div className="p-2 text-gray-500">결과 없음</div>
      )}
    </div>
  );
};

export default Modal;
