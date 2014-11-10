

#include "ssctf.h"
#include "SuperNetwork.h"


USuperNetwork::USuperNetwork(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{

}


//Happy Message
FString USuperNetwork::GetHappyMessage()
{
	return FString("Victory! Victory BP Library Works!");
}