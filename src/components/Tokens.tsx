import Slot from "./Slot"

const Tokens = () => {
  return (
    <div className="px-12 text-2xl">
     Tokens :-
     <div className="w-full min-h-32 border-[1px] border-white rounded-2xl  my-6 py-3 px-2 flex flex-col gap-3">
        <Slot src="https://images.unsplash.com/photo-1660062993887-4938423dce59?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYW5hfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" TokenName="SOL" TokenValue={34.2} CurrentPrice="34.5$" TodayUpdate="+0.5$"/>
        <Slot src="https://images.unsplash.com/photo-1660062993887-4938423dce59?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYW5hfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" TokenName="SOL" TokenValue={34.2} CurrentPrice="34.5$" TodayUpdate="+0.5$"/>
        <Slot src="https://images.unsplash.com/photo-1660062993887-4938423dce59?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYW5hfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" TokenName="SOL" TokenValue={34.2} CurrentPrice="34.5$" TodayUpdate="+0.5$"/>
        <Slot src="https://images.unsplash.com/photo-1660062993887-4938423dce59?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYW5hfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" TokenName="SOL" TokenValue={34.2} CurrentPrice="34.5$" TodayUpdate="+0.5$"/>
     </div>
    </div>
  )
}

export default Tokens
