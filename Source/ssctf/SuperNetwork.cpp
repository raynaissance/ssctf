#include "ssctf.h"
#include "SuperNetwork.h"
#include "easywsclient.hpp"
//#include <string.h>
#include <iostream>
#include <deque>

#include "AllowWindowsPlatformTypes.h"
#include <thread>
#include "HideWindowsPlatformTypes.h"

using namespace std;
using easywsclient::WebSocket;

void handle_message(const std::string & message) {
	cout << "received " << message.c_str() << endl;
	//if (message == "world") { ws->close(); }
}

// TODO is static reqd?
deque<string> messageQueue;

void workerFunction(){
	cout << "Worker running" << endl;

	WebSocket::pointer ws = WebSocket::from_url("ws://localhost:1338");
	//assert(ws);
	cout << "web socket opened";
	while (ws->getReadyState() != WebSocket::CLOSED) {
		if (messageQueue.empty())
			continue;
		string message = messageQueue.front();
		cout << "sending " << message << endl;
		ws->send(message);
		ws->poll();
		ws->dispatch(handle_message);
		messageQueue.pop_front();
	}
	delete ws;

	cout << "Worker done" << endl;
}

USuperNetwork::USuperNetwork(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
	
}


void USuperNetwork::Connect()
{
	cout << "Start" << endl;

	thread workerThread(workerFunction);
	cout << "Waiting for thread" << endl;

	for (int i = 0; i < 100; i++)
		messageQueue.push_back("p" + to_string(i));

	workerThread.detach();

	cout << "Main done" << endl;
}





//Register
void USuperNetwork::Register()
{
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("This is an on screen message!"));




}