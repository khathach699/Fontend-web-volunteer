import React, { useState } from 'react';

interface SortForm {
  onClose: () => void;
  onSubmit: (channel: string, url: string) => void;
}

const SortForm: React.FC<SortForm> = ({ onSubmit }) => {
  // State để lưu các lựa chọn đã chọn
  const [selectedScale, setSelectedScale] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Hàm để xử lý khi người dùng chọn một button
  const handleSelect = (setter: React.Dispatch<React.SetStateAction<string | null>>, value: string) => {
    setter(value);
  };

  // Hàm để xử lý submit
  const handleSubmit = () => {
    onSubmit(selectedScale!, selectedField!); // Chuyển tiếp giá trị đã chọn
  };

  return (
    <div className="bg-white p-6 rounded-[20px] shadow-md w-full max-w-[500px] mx-auto space-y-4 text-sm font-semibold text-[#333]">
      {/* QUY MÔ */}
      <div>
        <p className="mb-2">QUY MÔ</p>
        <div className="flex flex-wrap gap-2">
          <button
            className={`${
              selectedScale === 'trên 50 ng' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedScale, 'trên 50 ng')}
          >
            trên 50 ng
          </button>
          <button
            className={`${
              selectedScale === 'trên 100 ng' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedScale, 'trên 100 ng')}
          >
            trên 100 ng
          </button>
          <button
            className={`${
              selectedScale === 'trên 150 ng' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedScale, 'trên 150 ng')}
          >
            trên 150 ng
          </button>
          <button
            className={`${
              selectedScale === 'trên 200 ng' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedScale, 'trên 200 ng')}
          >
            trên 200 ng
          </button>
        </div>
      </div>

      {/* LĨNH VỰC */}
      <div>
        <p className="mb-2">LĨNH VỰC</p>
        <div className="flex flex-wrap gap-2">
          <button
            className={`${
              selectedField === 'giáo dục' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedField, 'giáo dục')}
          >
            giáo dục
          </button>
          <button
            className={`${
              selectedField === 'môi trường' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedField, 'môi trường')}
          >
            môi trường
          </button>
          <button
            className={`${
              selectedField === 'y tế' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedField, 'y tế')}
          >
            y tế
          </button>
          <button
            className={`${
              selectedField === 'văn hóa' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedField, 'văn hóa')}
          >
            văn hóa
          </button>
        </div>
      </div>

      {/* KHU VỰC */}
      <div>
        <p className="mb-2">KHU VỰC</p>
        <div className="flex flex-wrap gap-2">
          <button
            className={`${
              selectedRegion === 'Tp. HCM' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedRegion, 'Tp. HCM')}
          >
            Tp. HCM
          </button>
          <button
            className={`${
              selectedRegion === 'Hà Nội' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedRegion, 'Hà Nội')}
          >
            Hà Nội
          </button>
          <button
            className={`${
              selectedRegion === 'Miền Trung' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedRegion, 'Miền Trung')}
          >
            Miền Trung
          </button>
          <button
            className={`${
              selectedRegion === 'Miền Bắc' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedRegion, 'Miền Bắc')}
          >
            Miền Bắc
          </button>
        </div>
      </div>

      {/* ĐIỂM TÍCH LŨY */}
      <div>
        <p className="mb-2">ĐIỂM TÍCH LŨY</p>
        <div className="flex flex-wrap gap-2">
          <button
            className={`${
              selectedPoints === '10' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedPoints, '10')}
          >
            10
          </button>
          <button
            className={`${
              selectedPoints === '25' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedPoints, '25')}
          >
            25
          </button>
          <button
            className={`${
              selectedPoints === '50' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedPoints, '50')}
          >
            50
          </button>
          <button
            className={`${
              selectedPoints === '100' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedPoints, '100')}
          >
            100
          </button>
        </div>
      </div>

      {/* THỜI GIAN */}
      <div>
        <p className="mb-2">THỜI GIAN</p>
        <div className="flex flex-wrap gap-2">
          <button
            className={`${
              selectedTime === '14 ngày' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedTime, '14 ngày')}
          >
            14 ngày
          </button>
          <button
            className={`${
              selectedTime === '1 tháng' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedTime, '1 tháng')}
          >
            1 tháng
          </button>
          <button
            className={`${
              selectedTime === '3 tháng' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedTime, '3 tháng')}
          >
            3 tháng
          </button>
          <button
            className={`${
              selectedTime === '6 tháng' ? 'bg-[#609966] text-white' : 'bg-[#EDF1D6] border border-[#40513B]'
            } rounded-full px-4 py-1`}
            onClick={() => handleSelect(setSelectedTime, '6 tháng')}
          >
            6 tháng
          </button>
        </div>
      </div>

      {/* Sort button */}
      <div className="flex justify-end">
        <button
          className="bg-[#EDF1D6] border border-[#40513B] rounded-full px-6 py-1 shadow-sm hover:bg-[#DDEBC5] transition-all"
          onClick={handleSubmit}
        >
          Sort
        </button>
      </div>
    </div>
  );
};

export default SortForm;
