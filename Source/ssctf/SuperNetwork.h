

#pragma once

#include "Kismet/BlueprintFunctionLibrary.h"
#include "SuperNetwork.generated.h"

/**
 * 
 */
UCLASS()
class SSCTF_API USuperNetwork : public UBlueprintFunctionLibrary
{
	GENERATED_UCLASS_BODY()

	UFUNCTION(BlueprintCallable, Category = "VictoryBPLibrary")
	static FString GetHappyMessage();
	
};
