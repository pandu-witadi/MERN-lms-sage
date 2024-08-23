export default function ConfirmationModal({modalData}) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto backdrop-blur-sm">
      <div className="w-10/12 max-w-[350px] rounded-lg border border-app-border p-6 bg-app-yellow">
        <p className="text-2xl font-semibold">
          {modalData?.text1}
        </p>

        <p className="mt-3 mb-5 leading-6 opacity-70 text-lg">
          {modalData?.text2}
        </p>

        <div className="flex items-center gap-x-4">
          <button
            className="btn btn-md bg-app-error border-app-error"
            onClick={modalData?.btn1Handler}
          >
            {modalData?.btn1Text}
          </button>
          <button
            className="btn btn-md btn-neutral"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>

      </div>
    </div>
  )
}